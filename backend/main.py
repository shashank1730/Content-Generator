from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import uuid
from datetime import datetime

# Import our modules
from models import GenerateRequest, Generation
from agent import graph
from database import supabase

# 1. Load Environment Variables
load_dotenv()

# 2. Initialize the FastAPI App
app = FastAPI(
    title="AI Content Generator API",
    description="Backend for the AI Content Generator Platform",
    version="1.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing)
# This allows our Next.js frontend (running on port 3000) to talk to this backend (port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    """
    Health check endpoint.
    """
    return {"status": "active", "message": "Welcome to the AI Content Generator API"}

@app.post("/generate")
async def generate_content(request: GenerateRequest):
    """
    Triggers the AI Agent to generate content.
    """
    try:
        # 1. Run the Agent
        initial_state = {
            "topic": request.topic,
            "platform": request.platform,
            "tone": request.tone,
            "revision_count": 0
        }
        
        result = graph.invoke(initial_state)
        
        # 2. Extract the final content
        content = result.get("draft_content")
        
        # 3. Save to Supabase if user_id is provided
        print(f"DEBUG: user_id received: {request.user_id}")
        if request.user_id:
            try:
                print(f"DEBUG: Attempting to save to Supabase...")
                response = supabase.table("generations").insert({
                    "user_id": request.user_id,
                    "topic": request.topic,
                    "platform": request.platform,
                    "tone": request.tone,
                    "content": content
                }).execute()
                print(f"DEBUG: Successfully saved to Supabase: {response}")
            except Exception as db_error:
                print(f"ERROR: Failed to save to database: {db_error}")
                # Continue even if DB save fails
        else:
            print("DEBUG: No user_id provided, skipping database save")
        
        return {
            "content": content,
            "critique": result.get("critique_feedback"),
            "research": result.get("research_data")
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
async def get_history(user_id: str):
    """
    Fetches past generations for a user.
    """
    try:
        response = supabase.table("generations").select("*").eq("user_id", user_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

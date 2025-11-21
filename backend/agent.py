from typing import TypedDict, List
from langgraph.graph import StateGraph, END
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize LLM (We'll use this later for writing)
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

# 1. Define the State (The "Memory")
class AgentState(TypedDict):
    topic: str
    platform: str
    tone: str
    research_data: str
    draft_content: str
    critique_feedback: str
    final_content: str
    revision_count: int

# 2. Node: Researcher
def research_node(state: AgentState):
    """
    Uses Tavily API to find top 3 search results for the topic.
    """
    topic = state["topic"]
    print(f"🔎 Researching: {topic}")
    
    # Initialize Search Tool
    # Ensure TAVILY_API_KEY is in .env
    search = TavilySearchResults(max_results=5)
    
    try:
        # search.invoke returns a list of dicts with 'url' and 'content'
        results = search.invoke(topic)
        
        # We combine the results into a single string for the Writer to read
        research_summary = "\n\n".join([f"Source: {r['url']}\nContent: {r['content']}" for r in results])
        
    except Exception as e:
        print(f"⚠️ Research failed: {e}")
        research_summary = "No research data available. Proceed with general knowledge."
        
    # We return a DICTIONARY with the keys we want to update in the State
    return {"research_data": research_summary}

# 3. Node: Writer
def generation_node(state: AgentState):
    """
    Generates the content based on the research and platform.
    """
    topic = state["topic"]
    platform = state["platform"]
    tone = state["tone"]
    research_data = state["research_data"]
    
    print(f"✍️ Writing draft for {platform}...")
    
    # Define Platform-Specific Prompts
    prompts = {
        "LinkedIn": """
            You are a top-tier LinkedIn Influencer. Write a viral LinkedIn post about the given topic.
            Style: Professional yet personal, use short paragraphs, emojis, and a strong hook.
            Structure: Hook -> Insight -> Actionable Advice -> Engagement Question.
            Tone: {tone}
        """,
        "Medium": """
            You are a thought leader on Medium. Write a comprehensive article about the given topic.
            Style: In-depth, storytelling, use headers (##), and bullet points.
            Structure: Title -> Introduction -> Deep Dive (3-4 sections) -> Conclusion.
            Tone: {tone}
        """,
        "Twitter": """
            You are a Twitter/X viral content creator. Write a Thread (5-7 tweets) about the given topic.
            Style: Punchy, controversial or insightful, very short sentences.
            Structure: Tweet 1 (Hook) -> Tweet 2-6 (Value) -> Tweet 7 (Call to Action).
            Tone: {tone}
        """
    }
    
    # Default to LinkedIn if platform not found
    system_prompt = prompts.get(platform, prompts["LinkedIn"]).format(tone=tone)
    
    user_message = f"""
    Topic: {topic}
    
    Research Data:
    {research_data}
    
    Write the content now.
    """
    
    messages = [
        ("system", system_prompt),
        ("user", user_message)
    ]
    
    response = llm.invoke(messages)
    
    
    return {"draft_content": response.content, "revision_count": 0}

# 4. Node: Critique (The Editor)
def reflection_node(state: AgentState):
    """
    Reviews the draft and provides feedback.
    """
    draft = state["draft_content"]
    platform = state["platform"]
    tone = state["tone"]
    
    print(f"🧐 Critiquing draft...")
    
    system_prompt = """
    You are a strict Editor. Review the draft content.
    Check for:
    1. Tone consistency (Is it {tone}?)
    2. Platform fit (Is it good for {platform}?)
    3. Engagement (Is the hook strong?)
    
    Provide brief, constructive feedback on how to improve it.
    If it is perfect, just say "PERFECT".
    """
    
    user_message = f"Draft:\n{draft}\n\nPlatform: {platform}\nTone: {tone}"
    
    messages = [
        ("system", system_prompt.format(tone=tone, platform=platform)),
        ("user", user_message)
    ]
    
    response = llm.invoke(messages)
    
    return {"critique_feedback": response.content}

# 5. Build the Graph
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("researcher", research_node)
workflow.add_node("writer", generation_node)
workflow.add_node("editor", reflection_node)

# Add Edges (The Flow)
workflow.set_entry_point("researcher")
workflow.add_edge("researcher", "writer")
workflow.add_edge("writer", "editor")
workflow.add_edge("editor", END) # For now, we stop after critique. We can add the loop later.

# Compile the Graph
graph = workflow.compile()

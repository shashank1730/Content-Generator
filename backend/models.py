from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid

# 1. Request Model
# This is what the Frontend sends to us when they click "Generate".
class GenerateRequest(BaseModel):
    topic: str
    platform: str  # e.g., "LinkedIn", "Medium"
    tone: str      # e.g., "Professional", "Funny"
    creativity: int = 5  # 1-10 scale, default is 5
    user_id: str = None  # Optional: for saving to database

# 2. Database Model
# This represents a row in our 'generations' table.
class Generation(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    topic: str
    platform: str
    tone: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True

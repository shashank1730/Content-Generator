import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
# Use service_role key to bypass RLS when inserting from backend
key: str = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("SUPABASE_KEY")

if not url or not key:
    raise ValueError("Supabase credentials not found in .env file")

# This 'supabase' object is what we will use to talk to the DB.
# Using service_role key allows backend to insert data bypassing RLS
supabase: Client = create_client(url, key)

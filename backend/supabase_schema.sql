-- Create the generations table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic TEXT NOT NULL,
    platform TEXT NOT NULL,
    tone TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only read their own generations
CREATE POLICY "Users can view their own generations"
    ON generations
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy: Users can only insert their own generations
CREATE POLICY "Users can insert their own generations"
    ON generations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can delete their own generations
CREATE POLICY "Users can delete their own generations"
    ON generations
    FOR DELETE
    USING (auth.uid() = user_id);

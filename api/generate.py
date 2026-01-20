import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class CaptionRequest(BaseModel):
    topic: str
    tone: str
    type: str

# Fallback captions if OpenAI is not available
FALLBACK_CAPTIONS = {
    "funny": [
        "When you realize it's Monday tomorrow...",
        "Me pretending to be productive",
        "POV: You just understood the assignment"
    ],
    "inspirational": [
        "Every day is a new opportunity to be great",
        "Believe in yourself and you're halfway there",
        "Your potential is limitless"
    ],
    "sarcastic": [
        "Oh wow, how original",
        "Because that totally makes sense",
        "Sure, let's go with that plan"
    ],
    "casual": [
        "Just vibing with the homies",
        "Living my best life",
        "That's the spirit"
    ],
    "professional": [
        "Excellence in every endeavor",
        "Teamwork makes the dream work",
        "Innovation through collaboration"
    ]
}

def simple_profanity_filter(text: str) -> str:
    """Simple profanity filter - replace common bad words"""
    bad_words = ["hell", "damn", "crap"]
    filtered = text.lower()
    for word in bad_words:
        filtered = filtered.replace(word, "*" * len(word))
    return filtered

@app.post("/api/generate")
async def generate_captions(request: CaptionRequest):
    """Generate captions using OpenAI or return fallback captions"""
    api_key = os.getenv("OPENAI_API_KEY")
    
    if not api_key:
        # Return fallback captions if no API key
        tone = request.tone.lower() if request.tone else "casual"
        captions = FALLBACK_CAPTIONS.get(tone, FALLBACK_CAPTIONS["casual"])
        return JSONResponse({"captions": captions})
    
    try:
        # Call OpenAI API
        prompt = f"""Generate 3 creative and engaging {request.tone.lower()} captions for a {request.type} about {request.topic}. 
        Make them short (under 100 chars each), punchy, and suitable for social media.
        Return ONLY a JSON array of 3 strings, no other text.
        Example format: ["caption 1", "caption 2", "caption 3"]"""
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                json={
                    "model": os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
                    "messages": [
                        {"role": "system", "content": "You are a creative caption writer for memes and posters."},
                        {"role": "user", "content": prompt}
                    ],
                    "temperature": 0.8,
                    "max_tokens": 200
                },
                headers={"Authorization": f"Bearer {api_key}"}
            )
            
            if response.status_code != 200:
                # Fallback if API call fails
                tone = request.tone.lower() if request.tone else "casual"
                captions = FALLBACK_CAPTIONS.get(tone, FALLBACK_CAPTIONS["casual"])
                return JSONResponse({"captions": captions})
            
            data = response.json()
            content = data["choices"][0]["message"]["content"].strip()
            
            # Parse the response - try to extract JSON array
            try:
                captions = json.loads(content)
                if isinstance(captions, list) and len(captions) >= 3:
                    # Apply profanity filter and limit to 3
                    filtered = [simple_profanity_filter(cap)[:100] for cap in captions[:3]]
                    return JSONResponse({"captions": filtered})
            except json.JSONDecodeError:
                pass
            
            # Fallback captions if parsing fails
            tone = request.tone.lower() if request.tone else "casual"
            captions = FALLBACK_CAPTIONS.get(tone, FALLBACK_CAPTIONS["casual"])
            return JSONResponse({"captions": captions})
            
    except Exception as e:
        # Return fallback captions on any error
        tone = request.tone.lower() if request.tone else "casual"
        captions = FALLBACK_CAPTIONS.get(tone, FALLBACK_CAPTIONS["casual"])
        return JSONResponse({"captions": captions})

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}

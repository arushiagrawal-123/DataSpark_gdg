from google import genai
import os

# Configure client using ENV variable
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

image_url = "https://vdbetqxhwextlybbmc.supabase.co/storage/v1/object/public/campus-issues/dustbins/dust1.jpg"

prompt = f"""
You are helping classify campus issues.

Given this IMAGE URL, infer the most likely issue.

Return ONLY valid JSON in this exact format:
{{
  "issue_type": "dustbin | electricity | water | safety | internet | noise | infrastructure | others",
  "unsafe_flag": 0 or 1,
  "severity_hint": 1 or 2 or 3
}}

Image URL: {image_url}

Do NOT explain anything.
"""

response = client.models.generate_content(
    model="models/gemini-1.5-flash",
    contents=prompt
)

print(response.text)


# Campus Issue Classification (Gemini API)

This project uses Google Gemini API to classify campus-related issues
from an image URL and return structured JSON output.

## Output Format

{
  "issue_type": "dustbin | electricity | water | safety | internet | noise | infrastructure | others",
  "unsafe_flag": 0,
  "severity_hint": 2
}

## Setup

1. Install dependencies:
pip install google-genai requests pillow

2. Set Gemini API key:
export GEMINI_API_KEY="API_KEY_HERE"

3. Run the script:
python3 gemini_image.py

## Notes
- Uses Gemini API (not Google Cloud Vision)
- Works with public image URLs
- Backend-friendly JSON output


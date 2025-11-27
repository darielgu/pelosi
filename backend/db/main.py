import os

from dotenv import load_dotenv
from supabase import create_client

load_dotenv()
key = os.getenv("SUPA_KEY", "false_key")
url = os.getenv("SUPA_URL", "false_url")


supa_client = create_client(supabase_url=url, supabase_key=key)

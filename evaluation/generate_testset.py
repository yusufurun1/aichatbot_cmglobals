import json
import random
import os
import time
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

# Load environment variables
load_dotenv(dotenv_path='../.env.local')

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in ../.env.local")

# Initialize Gemini (Use 'gemini-pro' for maximum compatibility)
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    google_api_key=API_KEY,
    temperature=0.7
)

# Load Knowledge Base
with open('../public/knowledge_base.json', 'r') as f:
    knowledge_base = json.load(f)

print(f"Loaded {len(knowledge_base)} chunks from knowledge base.")

# Generator Prompt
GENERATOR_PROMPT = PromptTemplate.from_template("""
You are a strict teacher creating a test exam for a financial trading bot.
Based ONLY on the context below, generate a distinct question and a precise ground truth answer.

Context:
{context}

Format your output exactly as JSON:
{{
    "question": "The question text",
    "ground_truth": "The answer derived strictly from context"
}}
""")

def generate_test_data(num_samples=10):
    test_set = []
    # Weighted random sample: Prefer chunks with tables or "Specific" data
    # For now, just simple random sample
    selected_chunks = random.sample(knowledge_base, min(num_samples, len(knowledge_base)))
    
    for i, chunk in enumerate(selected_chunks):
        print(f"Generating pair {i+1}/{len(selected_chunks)} for chunk {chunk['id']}...")
        attempts = 0
        while attempts < 3:
            try:
                chain = GENERATOR_PROMPT | llm
                response = chain.invoke({"context": chunk['content']})
                
                # Clean response to ensure valid JSON
                content = response.content.strip()
                if content.startswith('```json'):
                    content = content[7:-3]
                elif content.startswith('```'):
                    content = content[3:-3]
                
                data = json.loads(content)
                data['context'] = [chunk['content']] # Ground validity reference
                test_set.append(data)
                
                time.sleep(2) # Base rate limit respect
                break # Success
                
            except Exception as e:
                print(f"Error on attempt {attempts+1}: {e}")
                if "429" in str(e):
                    wait_time = (2 ** attempts) * 5 # 5s, 10s, 20s
                    print(f"Rate limit hit. Sleeping {wait_time}s...")
                    time.sleep(wait_time)
                    attempts += 1
                else:
                    print("Non-retriable error. Skipping.")
                    break

    with open('testset.json', 'w') as f:
        json.dump(test_set, f, indent=2)
    
    print(f"✅ Generated {len(test_set)} test pairs in testset.json")

if __name__ == "__main__":
    generate_test_data(num_samples=10)

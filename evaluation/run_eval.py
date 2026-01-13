import json
import os
import time
import numpy as np
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevancy,
    context_precision,
    context_recall,
)
from datasets import Dataset

# Load env
load_dotenv(dotenv_path='../.env.local')
API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Models
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp", google_api_key=API_KEY)
embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", google_api_key=API_KEY)

# Load Knowledge Base for Retrieval Simulation
with open('../public/knowledge_base.json', 'r') as f:
    knowledge_base = json.load(f)

# Helper: Cosine Similarity
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# Helper: Retrieve Contexts (Simulating Client Logic)
def retrieve(query, k=5):
    query_vec = embeddings.embed_query(query)
    scores = []
    for chunk in knowledge_base:
        if 'embedding' not in chunk: continue
        score = cosine_similarity(query_vec, chunk['embedding'])
        scores.append((score, chunk['content']))
    
    scores.sort(key=lambda x: x[0], reverse=True)
    return [item[1] for item in scores[:k]]

# Helper: Generate Answer
def generate_answer(question, contexts):
    context_text = "\n\n".join(contexts)
    prompt = f"""
    You are the CM Globals AI Specialist. Answer based ONLY on the context.
    Context: {context_text}
    Question: {question}
    Answer:
    """
    return llm.invoke(prompt).content

def run_evaluation():
    # Load Test Data
    with open('testset.json', 'r') as f:
        test_data = json.load(f)
    
    final_results = []
    
    print(f"🚀 Starting Evaluation Run (Slow Mode) on {len(test_data)} items...")
    
    for i, item in enumerate(test_data):
        q = item['question']
        gt = item['ground_truth']
        
        print(f"\n[{i+1}/{len(test_data)}] Processing: {q[:40]}...")
        
        # 1. Retrieve & Generate (with basic retry)
        for attempt in range(3):
            try:
                retrieved_ctx = retrieve(q)
                ans = generate_answer(q, retrieved_ctx)
                break
            except Exception as e:
                print(f"  Generation Error (Attempt {attempt+1}): {e}")
                time.sleep(10 * (attempt + 1))
        else:
            print("  Skipping item due to generation failure.")
            continue

        # Prepare Single-Item Dataset
        data = {
            "question": [q],
            "answer": [ans],
            "contexts": [retrieved_ctx],
            "ground_truth": [[gt]]
        }
        dataset = Dataset.from_dict(data)

        # 2. Evaluate with Ragas (Retry Logic)
        success = False
        for attempt in range(3):
            try:
                print(f"  📊 Calculating Metrics (Attempt {attempt+1})...")
                result = evaluate(
                    dataset=dataset,
                    metrics=[faithfulness, answer_relevancy],
                    llm=llm,
                    embeddings=embeddings
                )
                # Convert result to dict to store
                res_dict = result.to_pandas().to_dict(orient='records')[0]
                final_results.append(res_dict)
                success = True
                print(f"  ✅ Result: {res_dict}")
                break
            except Exception as e:
                print(f"  ⚠️ Ragas Error: {e}")
                if "429" in str(e):
                    wait_time = 60 * (attempt + 1)
                    print(f"  ⏳ Rate limit hit. Cooling down for {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    break # Non-retryable
        
        if success:
            print("  ❄️ Cooling down for 30s before next item...")
            time.sleep(30)

    # Save Aggregated Results
    if final_results:
        import pandas as pd
        df = pd.DataFrame(final_results)
        print("\n📈 Final Evaluation Report:")
        print(df)
        df.to_csv('ragas_report.csv', index=False)
        print("✅ Saved to ragas_report.csv")
    else:
        print("❌ No results generated.")

if __name__ == "__main__":
    run_evaluation()

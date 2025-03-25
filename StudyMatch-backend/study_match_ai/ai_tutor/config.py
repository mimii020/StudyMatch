import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    groq_key = os.environ["GROQ_KEY"]
    pinecone_key = os.environ["PINECONE_KEY"]
    chunk_size = 500
    chunk_overlap = 50
    index_name = "langchainvector"
    model_name = "meta-llama/Llama-3.1-8B"
    embedding_model = "sentence-transformers/all-MiniLM-L6-v2"

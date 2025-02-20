
from langchain.embeddings import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
import time
from config import Config

class VectorStoreManager:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name=Config.embedding_model)
        self.pinecone = Pinecone(
            api_key=Config.pinecone_key,
        )
        self._ensure_index_exists()

    def _ensure_index_exists(self):
            index_name = Config.index_name
            existing_indexes = [index_info["name"] for index_info in self.pinecone.list_indexes()]

            if index_name not in existing_indexes:
                self.pinecone.create_index(
                    name=index_name,
                    dimension=384,
                    metric="cosine",
                    spec=ServerlessSpec(cloud="aws", region="us-east-1"),
                )
                while not self.pinecone.describe_index(index_name).status["ready"]:
                    time.sleep(1)

    def _get_vector_store(self):
            index = self.pinecone.Index(Config.index_name)
            return PineconeVectorStore(index=index, embedding=self.embeddings)   
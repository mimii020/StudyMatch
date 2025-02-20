from flask import Flask, request, jsonify
from vector_store import VectorStoreManager
from data_processing import DataProcessor
from llm_chain import LlmChain
from config import Config
import os

app = Flask(__name__) 

vector_store_manager = VectorStoreManager()
vector_store = vector_store_manager._get_vector_store()
retreiver = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k":2},
)
data_processor = DataProcessor()
llm_chain = LlmChain(retreiver)

@app.route("/chat", methods=["POST"])
def Chat():
    data = request.json
    if "query" not in data:
        return jsonify({"error": "query is not in the request"}), 400
    
    try:
        response = llm_chain._invoke(data["query"])
        return jsonify({
            "answer": response.content,
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/upload", methods=["POST"])
def Upload():
    if "file" not in request.files:
        return jsonify({"error": "no file uploaded"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "filename is empty"}), 400

    try:
        file_path = f"temp/{file.filename}"
        file.save(file_path)

        processor = DataProcessor(
            chunk_size=Config.chunk_size,
            chunk_overlap=Config.chunk_overlap
        )

        docs = processor.load_document(file_path)
        chunks = processor.chunk_documents(docs)
        vector_store.add_documents(chunks)

        return jsonify({"message": f"added {len(chunks)} successfully"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5000)
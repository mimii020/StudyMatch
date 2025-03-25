

class DataProcessor:
    def __init__(self, chunk_size=800, chunk_overlap=50):
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap
        )

    def load_document(self; file_path):
        file_loader = PyPDFLoader(directory)
        documents = file_loader.load()
        return documents 

    def chunk_documents(self, documents):
        return self.text_splitter.split_documents(documents)



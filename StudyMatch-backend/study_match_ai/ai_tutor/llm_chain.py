from config import Config

class LlmChain:
    def __init__(self, retreiver):
        self.llm = ChatGroq(
            api_key=Config.groq_key,
            name=Config.model_name
        )
        self.retreiver = retreiver
        self.chain = _create_chain()

        def _create_prompt()
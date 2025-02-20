from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from config import Config

class LlmChain:
    def __init__(self, retreiver):
        self.llm = ChatGroq(
            api_key=Config.groq_key,
            name=Config.model_name
        )
        self.retreiver = retreiver
        self.chain = self._create_chain()


    def _create_prompt(self):
                system_template = """<|begin_of_text|>
                    <|start_header_id|>system<|end_header_id|>
                    You are an encouraging maths tutor for STEM students. Follow these rules:
                    1. Explain concepts in the user INPUT below, using simple terms with real-world examples
                    2. Break problems into step-by-step solutions
                    3. Use LaTeX formatting for equations: $x^2 + 3x = 0$
                    4. Ask guiding questions instead of giving direct answers
                    5. Explain concepts using examples from CONTEXT below
                    6. Cite sources when using specific formulas/theorems
                    7. Combine CONTEXT with your general math knowledge

                    CONTEXT: {context}
                    INPUT: {input}<|eot_id|>
                    <|start_header_id|>assistant<|end_header_id|>
                """

                return ChatPromptTemplate.from_template(system_template)
        
    def _create_chain(self):
            chain = (
                {
                    "context": RunnablePassthrough() | self.retreiver,
                    "input": RunnablePassthrough()
                }
                | self._create_prompt()
                | self.llm
                
            )
            return chain    

    def _invoke(self, input):
            return self.chain.invoke(input)       
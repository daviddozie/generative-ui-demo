from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ag_ui_langgraph import add_langgraph_fastapi_endpoint
from copilotkit import LangGraphAGUIAgent, CopilotKitMiddleware
from langchain_openai import ChatOpenAI
from langchain.agents import create_agent
from langgraph.checkpoint.memory import MemorySaver
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the agent
llm = ChatOpenAI (
    model="gpt-4o-mini",
    openai_api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL")
)

# Create the agent with LLM and an empty list of tools
graph = create_agent (
    model=llm,
    tools=[],
    middleware=[CopilotKitMiddleware()],
    checkpointer=MemorySaver(),
    system_prompt="You are a helpful assistant."
)

# Initialize the LangGraph AGUI agent
agent = LangGraphAGUIAgent(
    name='generative-ui-agent',
    description="An agent that provides concise answers to user queries.",
    graph=graph,
)

# Add LangGraph FastAPI endpoints
add_langgraph_fastapi_endpoint(
    app=app,
    agent=agent,
    path="/"
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
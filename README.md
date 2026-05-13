# Generative UI Demo

A full-stack demo application showcasing **Generative UI** powered by [CopilotKit](https://copilotkit.ai), [LangGraph](https://www.langchain.com/langgraph), and the [AG-UI protocol](https://github.com/ag-ui-protocol/ag-ui). The project features a Next.js frontend that communicates with a FastAPI backend running a LangGraph agent, enabling a rich AI-powered chat experience directly in the browser.

---

## 🧱 Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript, Tailwind CSS  |
| Backend   | FastAPI, Python, Uvicorn                        |
| AI Agent  | LangGraph + LangChain + OpenAI (`gpt-4o-mini`)  |
| Protocol  | CopilotKit Runtime v2, AG-UI LangGraph          |

---

## 📁 Project Structure

```
generative-ui-demo/
├── backend/
│   ├── main.py            # FastAPI app with LangGraph agent setup
│   └── requirement.txt    # Python dependencies
└── frontend/
    ├── app/
    │   ├── page.tsx        # Main chat UI using CopilotChat
    │   ├── layout.tsx      # Root layout
    │   ├── globals.css     # Global styles
    │   └── api/
    │       └── copilotkit/
    │           └── [...slug]/
    │               └── route.ts  # CopilotKit API route (connects to backend)
    ├── package.json
    └── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.10+
- An **OpenAI API key**

---

### 1. Clone the Repository

```bash
git clone https://github.com/david_dozie/generative-ui-demo.git
cd generative-ui-demo
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirement.txt

# Create a .env file and add your OpenAI key
echo "OPENAI_API_KEY=your_openrouter_api_key_here" > .env

# Start the backend server
python main.py
```

The backend will be available at **http://localhost:8000**.

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at **http://localhost:3000**.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable           | Description                                     | Required |
|--------------------|-------------------------------------------------|----------|
| `OPENAI_API_KEY`   | Your OpenAI API key                             | ✅        |
| `OPENAI_BASE_URL`  | Custom OpenAI base URL (optional, for proxies)  | ❌        |

### Frontend (`frontend/.env.local`)

| Variable                   | Description                          | Default                    |
|----------------------------|--------------------------------------|----------------------------|
| `LANGGRAPH_DEPLOYMENT_URL` | URL of the LangGraph FastAPI server  | `http://localhost:8000`    |

---

## 🏗️ How It Works

1. The **Next.js frontend** renders a full-screen `CopilotChat` component powered by CopilotKit.
2. User messages are sent to the **CopilotKit API route** (`/api/copilotkit`) in the Next.js app.
3. The API route forwards requests to the **FastAPI backend** via a `LangGraphHttpAgent`.
4. The backend runs a **LangGraph agent** using `gpt-4o-mini` and streams responses back through the AG-UI protocol.
5. The frontend renders AI responses generatively in real time.

---

## 📦 Available Scripts

### Frontend

| Command              | Description                  |
|----------------------|------------------------------|
| `npm run dev`        | Start the development server |
| `npm run build`      | Build for production         |
| `npm run start`      | Start the production server  |
| `npm run lint`       | Run ESLint                   |

### Backend

| Command                       | Description                    |
|-------------------------------|--------------------------------|
| `python main.py`              | Start the FastAPI server       |
| `uvicorn main:app --reload`   | Start with hot-reload          |

---


This project is open-source.

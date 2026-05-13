# Generative UI Demo

A full-stack demo application showcasing **Generative UI** powered by [CopilotKit](https://copilotkit.ai), [LangGraph](https://www.langchain.com/langgraph), and the [AG-UI protocol](https://github.com/ag-ui-protocol/ag-ui). The project features a Next.js frontend that communicates with a FastAPI backend running a LangGraph agent — enabling a rich, real-time AI chat experience with dynamically rendered UI components directly in the browser.

---

## 🧱 Tech Stack

| Layer     | Technology                                                          |
|-----------|---------------------------------------------------------------------|
| Frontend  | Next.js 16, React 19, TypeScript, Tailwind CSS v4, Zod             |
| Backend   | FastAPI, Python, Uvicorn, python-dotenv                             |
| AI Agent  | LangGraph + LangChain + OpenAI (`gpt-4o-mini`)                      |
| Protocol  | CopilotKit v1.57, AG-UI LangGraph (`@ag-ui/langgraph`)              |

---

## ✨ Generative UI Components

The frontend uses `useComponent` from CopilotKit to register AI-driven UI components that the agent can render on demand:

| Component     | Description                                              |
|---------------|----------------------------------------------------------|
| `showMyName`  | Displays a personalized name card                        |
| `pieChart`    | Renders an interactive pie chart from structured data    |
| `flightCard`  | Shows a flight summary card with airline, route, status  |

All component schemas are defined with **Zod** in `frontend/app/schema/index.ts`.

---

## 📁 Project Structure

```
generative-ui-demo/
├── backend/
│   ├── main.py              # FastAPI app with LangGraph agent setup
│   └── requirement.txt      # Python dependencies
└── frontend/
    ├── app/
    │   ├── page.tsx          # Main chat UI — registers generative components
    │   ├── layout.tsx        # Root layout with CopilotKit provider
    │   ├── globals.css       # Global styles (Tailwind)
    │   ├── schema/
    │   │   └── index.ts      # Zod schemas for PieChart & FlightCard props
    │   ├── components/
    │   │   ├── pie-chart.tsx  # Pie chart generative UI component
    │   │   └── flight-card.tsx# Flight card generative UI component
    │   ├── hooks/
    │   │   └── use-examples-suggestions.ts  # Example prompt suggestions
    │   └── api/
    │       └── copilotkit/
    │           └── [...slug]/
    │               └── route.ts  # CopilotKit API route (proxies to backend)
    ├── package.json
    └── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **Python** 3.10+
- An **OpenAI API key** (or a compatible proxy via `OPENAI_BASE_URL`)

---

### 1. Clone the Repository

```bash
git clone https://github.com/daviddozie/generative-ui-demo.git
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
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env

# (Optional) Add a custom base URL for OpenAI-compatible proxies
echo "OPENAI_BASE_URL=https://your-proxy-url" >> .env

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
| `OPENAI_BASE_URL`  | Custom OpenAI-compatible base URL (for proxies) | ❌        |

### Frontend (`frontend/.env.local`)

| Variable                   | Description                          | Default                    |
|----------------------------|--------------------------------------|----------------------------|
| `LANGGRAPH_DEPLOYMENT_URL` | URL of the LangGraph FastAPI server  | `http://localhost:8000`    |

---

## 🏗️ How It Works

1. The **Next.js frontend** renders a full-screen `CopilotChat` component and registers generative UI components via `useComponent`.
2. User messages are sent to the **CopilotKit API route** (`/api/copilotkit`) in the Next.js app.
3. The API route forwards requests to the **FastAPI backend** running a LangGraph agent.
4. The backend agent uses `gpt-4o-mini` and streams responses back through the **AG-UI protocol**.
5. The frontend dynamically renders `PieChart`, `FlightCard`, or other components based on the agent's structured output — in real time.

---

## 📦 Available Scripts

### Frontend

| Command           | Description                  |
|-------------------|------------------------------|
| `npm run dev`     | Start the development server |
| `npm run build`   | Build for production         |
| `npm run start`   | Start the production server  |
| `npm run lint`    | Run ESLint                   |

### Backend

| Command                         | Description                    |
|---------------------------------|--------------------------------|
| `python main.py`                | Start the FastAPI server       |
| `uvicorn main:app --reload`     | Start with hot-reload          |

---

## 📄 License

This project is open-source.

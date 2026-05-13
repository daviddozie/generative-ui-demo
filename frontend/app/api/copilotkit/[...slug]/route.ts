import { LangGraphHttpAgent } from "@ag-ui/langgraph";
import { CopilotRuntime, createCopilotEndpoint } from "@copilotkit/runtime/v2";

const langGraphAgent = new LangGraphHttpAgent({
    url: process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8000",
});

const runtime = new CopilotRuntime({
    agents: {
        default: langGraphAgent,
    },
});

const endpoint = createCopilotEndpoint({
    runtime,
    basePath: "/api/copilotkit",
});

export const GET = endpoint.fetch;
export const POST = endpoint.fetch;
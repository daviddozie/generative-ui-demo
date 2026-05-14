import { LangGraphHttpAgent } from "@ag-ui/langgraph";
import { CopilotRuntime, createCopilotEndpoint } from "@copilotkit/runtime/v2";

const langGraphAgent = new LangGraphHttpAgent({
    url: process.env.LANGGRAPH_DEPLOYMENT_URL || "http://localhost:8000",
});

const runtime = new CopilotRuntime({
    agents: {
        default: langGraphAgent,
    },
    openGenerativeUI: true,
    // a2ui: {
    //     injectA2UITool: true,
    // }
    mcpApps: {
        servers: [
            {
                type: "http",
                url: "https://mcp.excalidraw.com", // <- Exalidraw MCP Server
                serverId: "example_mcp_server",
            }
        ]
    }
});

const endpoint = createCopilotEndpoint({
    runtime,
    basePath: "/api/copilotkit",
});

export const GET = endpoint.fetch;
export const POST = endpoint.fetch;
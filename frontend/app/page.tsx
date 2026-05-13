import { CopilotChat } from "@copilotkit/react-core/v2";

const agentId = "default";

export default function Home() {
    return (
        <main className="flex h-screen w-full">
            <CopilotChat agentId={agentId} className="w-full!"/>
        </main>
    );
}
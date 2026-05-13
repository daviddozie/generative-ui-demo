"use client";

import * as z from "zod";
import { CopilotChat } from "@copilotkit/react-core/v2";
import { useComponent } from "@copilotkit/react-core/v2";
import { PieChartProps, FlightCardProps } from "./schema";
import { PieChart } from "./components/pie-chart";
import { FlightCard } from "./components/flight-card";
import { useExampleSuggestions } from "./hooks/use-examples-suggestions";

const agentId = "default";

export default function Home() {
    useComponent({
        name: "showMyName",
        description: "Show the user's name in a card",
        parameters: z.object({ name: z.string() }),
        render: ({ name }) => (
            <div className="rounded-lg border border-border bg-secondary px-5 py-4">
                <p className="m-0 text-[13px] text-muted-foreground">Hello,</p>
                <p className="mt-1 text-xl font-medium text-foreground">{name}!</p>
            </div>
        ),
    });

    useComponent({
        name: "pieChart",
        description: "Controlled Generative UI that displays data as a pie chart.",
        parameters: PieChartProps,
        render: PieChart,
    });

    useComponent({
        name: "flightCard",
        description: "Controlled Generative UI that displays a single flight summary card.",
        parameters: FlightCardProps,
        render: FlightCard,
    });

    useExampleSuggestions();

    return (
        <main className="flex h-screen w-full">
            <CopilotChat agentId={agentId} className="w-full!" />
        </main>
    );
}
"use client";

import { useCopilotChatSuggestions } from "@copilotkit/react-core";

export function useExampleSuggestions() {
    useCopilotChatSuggestions({
        instructions: "Suggest helpful example prompts the user can try",
        minSuggestions: 2,
        maxSuggestions: 4,
    });
}
"use client";

import { useCopilotChatSuggestions } from "@copilotkit/react-core";

export function useExampleDynamicSuggestions() {
    useCopilotChatSuggestions({
        instructions: "Suggest helpful example prompts the user can try",
        minSuggestions: 2,
        maxSuggestions: 4,
    });
}

export function useExampleFixedSuggestions() {
    useCopilotChatSuggestions({
        instructions: "Suggest helpful example prompts the user can try",
        minSuggestions: 2,
        maxSuggestions: 4,
    });
}
type ConversationTopicName =
    | "Weather and Seasons"
    | "Clothing and Fashion"
    | "Travel";

type ConversationTopicAndInstructions = {
    name: ConversationTopicName;
    instructions: Array<ChatMessage>;
};

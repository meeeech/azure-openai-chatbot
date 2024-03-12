import TravelInstructions from "./travel";
import { ChatRequestMessage } from "@azure/openai";

const conversationTopics: { [key: string]: Array<ChatRequestMessage> } = {
    Travel: TravelInstructions,
};

export default conversationTopics;

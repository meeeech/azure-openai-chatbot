import WeatherAndSeasonsInstructions from "./weather-and-seasons";
import TravelInstructions from "./travel";
import ClothingAndFashionInstructions from "./clothing-and-fashion";
import { ChatRequestMessage } from "@azure/openai";

const conversationTopics: { [key: string]: Array<ChatRequestMessage> } = {
    Travel: TravelInstructions,
    "Clothing and Fashion": ClothingAndFashionInstructions,
    "Weather and Seasons": WeatherAndSeasonsInstructions,
};

export default conversationTopics;

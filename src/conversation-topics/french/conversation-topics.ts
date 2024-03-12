import WeatherAndSeasonsInstructions from "./weather-and-seasons";
import TravelInstructions from "./travel";
import ClothingAndFashionInstructions from "./clothing-and-fashion";
import { ChatRequestMessage } from "@azure/openai";

const conversationTopics: { [key: string]: Array<ChatRequestMessage> } = {
    Voyage: TravelInstructions,
    "Vêtements et Mode": ClothingAndFashionInstructions,
    "Météo et Saisons": WeatherAndSeasonsInstructions,
};

export default conversationTopics;

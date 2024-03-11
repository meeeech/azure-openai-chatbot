import WeatherAndSeasonsInstructions from "./weather-and-seasons";
import TravelInstructions from "./travel";
import ClothingAndFashionInstructions from "./clothing-and-fashion";

const conversationTopics: Array<ConversationTopicAndInstructions> = [
    {
        name: "Weather and Seasons",
        instructions: WeatherAndSeasonsInstructions,
    },
    {
        name: "Travel",
        instructions: TravelInstructions,
    },
    {
        name: "Clothing and Fashion",
        instructions: ClothingAndFashionInstructions,
    },
];

export default conversationTopics;

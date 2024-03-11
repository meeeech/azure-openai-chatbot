import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const chatbotEndpoint = "https://mads-demitra-chatbot-test.openai.azure.com/";
const apiKey = import.meta.env.VITE_AZURE_CHATBOT_API_KEY;

const azureChatbotClient = new OpenAIClient(
    chatbotEndpoint,
    new AzureKeyCredential(apiKey as string)
);

const deploymentId = "english-learning-bot";

export { azureChatbotClient, deploymentId };

import { useState, ChangeEvent } from "react";
import { azureChatbotClient, deploymentId } from "./azure/open-ai-client";
import conversationTopics from "./conversation-topics/conversation-topics";
import MessageBubble from "./components/messageBubble";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ChatIcon from "@mui/icons-material/Chat";
import { ChatRequestMessage } from "@azure/openai/models";

function App() {
    const [chatThread, setChatThread] = useState<Array<ChatRequestMessage>>([]);
    const [userInput, setUserInput] = useState<ChatRequestMessage>({
        role: "user",
        content: "",
    });
    const [currentTopic, setCurrentTopic] =
        useState<ConversationTopicAndInstructions>(conversationTopics[0]);

    const submitMessage = async () => {
        setChatThread((oldThread) => [...oldThread, userInput]);
        setUserInput({ ...userInput, content: "" });

        try {
            await azureChatbotClient
                .getChatCompletions(
                    deploymentId,
                    [...currentTopic.instructions, ...chatThread, userInput],
                    {
                        temperature: 0.7,
                        topP: 0.95,
                    }
                )
                .then((response) =>
                    setChatThread((oldThread) => [
                        ...oldThread,
                        {
                            role: "assistant",
                            content: response.choices[0].message!.content,
                        },
                    ])
                );
        } catch (error: unknown) {
            if (!(error instanceof Error)) {
                throw error;
            }
            console.error("Error communicating with chatbot: ", error.message);
        }
    };
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Azure OpenAI Chatbot
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className="chat-thread">
                    {chatThread.map((message, i) => (
                        <MessageBubble
                            key={`${message.role}-message-${i}`}
                            role={message.role}
                            content={message.content as string}
                        />
                    ))}
                </div>
                <div className="chat-input-area">
                    <TextField
                        value={userInput.content}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            setUserInput({
                                ...userInput,
                                content: e.target.value,
                            })
                        }
                        sx={{ width: "75%" }}
                    />
                    <Button
                        onClick={submitMessage}
                        variant="contained"
                        endIcon={<ChatIcon />}
                    >
                        Chat
                    </Button>
                </div>
            </main>
        </>
    );
}

export default App;

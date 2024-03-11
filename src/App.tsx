import { useState, useEffect, ChangeEvent } from "react";
import { azureChatbotClient, deploymentId } from "./azure/open-ai-client";
import { ChatRequestMessage } from "@azure/openai/models";
import conversationTopics from "./conversation-topics/conversation-topics";
import MessageBubble from "./components/messageBubble";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import ChatIcon from "@mui/icons-material/Chat";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        secondary: {
            main: "#ffffff",
        },
    },
});

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const [chatThread, setChatThread] = useState<Array<ChatRequestMessage>>([]);

    const [userInput, setUserInput] = useState<ChatRequestMessage>({
        role: "user",
        content: "",
    });

    const [currentTopic, setCurrentTopic] = useState<string>(
        Object.keys(conversationTopics)[0]
    );

    const handleTopicChange = (e: SelectChangeEvent) => {
        setCurrentTopic(e.target.value);
        setChatThread([]);
        setUserInput({ ...userInput, content: "" });
    };

    const submitMessage = async () => {
        setChatThread((oldThread) => [...oldThread, userInput]);
        setUserInput({ ...userInput, content: "" });

        try {
            await azureChatbotClient
                .getChatCompletions(
                    deploymentId,
                    [
                        ...conversationTopics[currentTopic],
                        ...chatThread,
                        userInput,
                    ],
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

    useEffect(() => {
        const threadContainer = document.getElementById("chat-thread");
        threadContainer!.scrollTop = threadContainer!.scrollHeight;
    }, [chatThread]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppBar
                position="sticky"
                sx={{ padding: "0.5rem 0" }}
                color={darkMode ? "primary" : "secondary"}
            >
                <Toolbar>
                    <Typography component="h1" variant="h5">
                        Azure OpenAI Chatbot
                    </Typography>
                    <FormControlLabel
                        sx={{ marginLeft: "auto" }}
                        control={
                            <Switch
                                value={darkMode}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setDarkMode(e.target.checked)
                                }
                            />
                        }
                        label="Dark Mode"
                    />
                    <FormControl
                        variant="filled"
                        sx={{
                            marginLeft: "1rem",
                            width: "20rem",
                        }}
                    >
                        <InputLabel id="topic-select-label">
                            Conversation Topic
                        </InputLabel>
                        <Select
                            value={currentTopic}
                            label="Conversation Topic"
                            labelId="topic-select-label"
                            onChange={handleTopicChange}
                            disableUnderline
                        >
                            {Object.keys(conversationTopics).map((topic) => (
                                <MenuItem key={topic} value={topic}>
                                    {topic}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
            <main id="main">
                <Alert severity="info" sx={{ position: "sticky", top: 0 }}>
                    {`The current topic of conversation is ${currentTopic}`}
                </Alert>
                <div id="chat-thread">
                    {chatThread.map((message, i) => (
                        <MessageBubble
                            key={`${message.role}-message-${i}`}
                            role={message.role}
                            content={message.content as string}
                        />
                    ))}
                </div>
                <div className={`chat-input-area${darkMode ? " dark" : ""}`}>
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
        </ThemeProvider>
    );
}

export default App;

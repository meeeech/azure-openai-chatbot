import { Avatar } from "@mui/material";
import Chip from "@mui/material/Chip";

export default function MessageBubble({
    role,
    content,
}: {
    role: string;
    content: string;
}) {
    return role === "user" ? (
        <Chip
            sx={{ ...messageStyle, marginLeft: "auto" }}
            label={content}
            color="primary"
        />
    ) : (
        <Chip
            sx={{ ...messageStyle, marginRight: "auto" }}
            avatar={<Avatar src="/bot-avatar.png" />}
            label={content}
        />
    );
}

const messageStyle = {
    height: "auto",
    "& .MuiChip-label": {
        display: "block",
        whiteSpace: "normal",
        lineHeight: "1.5rem",
    },
    "& .MuiChip-avatar": {
        width: "2.5rem",
        height: "2.5rem",
    },
    padding: "1rem",
    fontSize: "1rem",
    maxWidth: "50%",
};

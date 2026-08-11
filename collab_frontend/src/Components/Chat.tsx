import { useState } from 'react';

import useNoteSocket from "../Hooks/useNoteSocket";


export default function Chat() {
    const { messages, sendMessage, deleteMessage } = useNoteSocket();
    const [input, setInput] = useState("");

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => { sendMessage(input); setInput(""); }}>Send</button>
            <ul>
                {messages.map((msg) => <li key={msg.id}>{msg.message}
                    <button onClick={() => deleteMessage(msg.id)}>Delete</button>
                </li>)}
            </ul>
        </div>
    );
}
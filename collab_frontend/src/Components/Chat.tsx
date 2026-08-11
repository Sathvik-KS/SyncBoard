import { useState } from 'react';

import useNoteSocket from "../Hooks/useNoteSocket";


export default function Chat() {
    const { messages, sendMessage } = useNoteSocket();
    const [input, setInput] = useState("");

    return (
        <div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => { sendMessage(input); setInput(""); }}>Send</button>
            <ul>
                {messages.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
        </div>
    );
}
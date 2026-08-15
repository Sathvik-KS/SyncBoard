import { useState } from 'react';

import useNoteSocket from "../Hooks/useNoteSocket";


export default function Chat() {
    const { messages, sendMessage, deleteMessage, senderId } = useNoteSocket();
    const [input, setInput] = useState("");
    const [inputTitle, setInputTitle] = useState("");

    const handleSend = () => {
        if(inputTitle.trim() || input.trim()) return;
        sendMessage(inputTitle.trim(), input.trim());
        setInput("");
        setInputTitle("");
    }

    return (
        <div className = "chat-page">
            <div className = "chat-form">
                <label className = "field">
                    <span>Title: </span> 
                    <input value = {inputTitle} onChange = {(e) => setInputTitle(e.target.value)}></input>
                </label>
                {/* <br/> */}
                <label className = "field">
                    <span>Message: </span> 
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} rows = {3}/>
                </label>
                {/* <br/> */}
                <button onClick = {handleSend}>Send</button>
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <span>{msg.message}</span>
                            {msg.sender_id === senderId && (
                                <button onClick={() => deleteMessage(msg.id)}>Delete</button>
                        )}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}
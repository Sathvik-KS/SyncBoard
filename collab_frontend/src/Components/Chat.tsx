import { useState } from 'react';

import useNoteSocket from "../Hooks/useNoteSocket";
import { useParams } from 'react-router-dom';
import RoomNav from './RoomNav';


export default function Chat() {
    const {roomName} = useParams();
    const [input, setInput] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const { messages, sendMessage, deleteMessage, senderId } = useNoteSocket(roomName ?? "General");

    const handleSend = () => {
        if(!inputTitle.trim() || !input.trim()) return;
        sendMessage(inputTitle.trim(), input.trim());
        setInput("");
        setInputTitle("");
    }

    return (
        <>
        <RoomNav></RoomNav>
        <div className = "chat-page">
            <div className = "chat-form">
                <label className = "field">
                    <span>Title: </span> 
                    <input value = {inputTitle} onChange = {(e) => setInputTitle(e.target.value)}></input>
                </label>
                <label className = "field">
                    <span>Message: </span> 
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} rows = {3}/>
                </label>
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
        </>
    );
}
import { useState, useEffect } from 'react';

import useNoteSocket from "../Hooks/useNoteSocket";
import { useParams } from 'react-router-dom';
import RoomNav from './RoomNav';
// import { send } from 'vite';


export default function Chat() {
    const { roomName } = useParams();
    const [input, setInput] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const { messages, sendMessage, deleteMessage, senderId, error, clearError } = useNoteSocket(roomName ?? "General");

    const handleSend = () => {
        if (!inputTitle.trim() || !input.trim()) return;
        sendMessage(inputTitle.trim(), input.trim());
        setInput("");
        setInputTitle("");
    }

    useEffect(() => {
        if (error === null) return;
        const timer = setTimeout(() => {
            clearError();
        }, 3000);

        return () => clearTimeout(timer)
    }, [error]);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-10 w-full max-w-lg">
                    <RoomNav></RoomNav>
                    <label className="block">
                        <span className="text-slate-300 text-sm" >Title: </span>
                        <input
                            value={inputTitle}
                            onChange={(e) => setInputTitle(e.target.value)}
                            className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400 hover:border-slate-100 transition"
                        />
                    </label>
                    <label className="block">
                        <span className="text-slate-300 text-sm">Message: </span>
                        <textarea value={input}
                            onChange={(e) => setInput(e.target.value)}
                            rows={3}
                            className="w-full mt-1 bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-blue-400 hover:border-slate-100 transition"
                        />
                    </label>
                    <button
                        onClick={handleSend}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition mb-2"
                    >Send</button>

                    {error && (
                        <div className="absolute bottom-full left-0 mb-2 w-full rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {messages.length === 0 && (
                        <p className="text-slate-500 text-sm text-center py-4">No Messages</p>
                    )}

                    <ul className="space-y-3 max-h-64 max-w-1000 overflow-y-auto">
                        {messages.map((msg) => (
                            <li key={msg.id}
                                className={` msg-enter flex ${msg.sender_id === senderId ? "justify-end" : "justify-start"}`}>

                                <div className={`msg-enter-other max-w-xs rounded-lg px-3 py-2 ${msg.sender_id === senderId
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-white"
                                    }`}>
                                    <p className="text-sm break-words">{msg.message}</p>
                                    {msg.sender_id === senderId && (
                                        <button onClick={() => deleteMessage(msg.id)}
                                            className="text-xs text-blue-200 hover:text-white mt-1"
                                        >Delete</button>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
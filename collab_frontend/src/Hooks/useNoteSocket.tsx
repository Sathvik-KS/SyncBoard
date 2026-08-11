import { useEffect, useState, useRef } from 'react';

export default function useNoteSocket() : { messages: string[]; sendMessage: (message: string) => void }{
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {

        async function loadExisting(){
            const res = await fetch("http://localhost:8000/api/notes");
            const data = await res.json();
            setMessages(data.map((note: any) => note.content));
        };
        loadExisting();

        const socket = new WebSocket('ws://localhost:8000/ws/notes/');
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [...prev, data.message]);
        };

        return () => {
            socket.close();
        };

    }, [])

    const sendMessage = (message:string) => {
        socketRef.current?.send(JSON.stringify({message})); 
    };

    return {messages, sendMessage};

}
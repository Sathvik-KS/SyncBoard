import { useEffect, useState, useRef } from 'react';

interface Message{
    id : number;
    action : string;
    message : string;
}

export default function useNoteSocket() : { messages: Message[]; sendMessage: (message: string) => void; deleteMessage: (id: number) => void }{
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {

        async function loadExisting(){
            const res = await fetch("http://localhost:8000/api/notes/");
            const data = await res.json();
            setMessages(data.map((note: any) => ({ id: note.id, action: "new", message: note.content })));
        };
        loadExisting();

        const socket = new WebSocket('ws://localhost:8000/ws/notes/');
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if(data.action === "new"){
                setMessages((prev) => [...prev, data]);
            }
            else{
                setMessages((prev) => prev.filter((p) => data.id !== p.id))
            }
        };

        return () => {
            socket.close();
        };

    }, [])

    const sendMessage = (message:string) => {
        socketRef.current?.send(JSON.stringify({action : "new", message})); 
    };

    const deleteMessage = (id : number) => {
        socketRef.current?.send(JSON.stringify({action : "delete", id}))
    }

    return {messages, sendMessage, deleteMessage};

}
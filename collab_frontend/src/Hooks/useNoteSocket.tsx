import { useEffect, useState, useRef } from 'react';

interface Message{
    id : number;
    action : string;
    message : string;
    sender_id : string;
}

export default function useNoteSocket() : { messages: Message[]; sendMessage: (title : string, message: string) => void; deleteMessage: (id: number) => void; senderId : string }{
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);


    const senderId = useRef(
        localStorage.getItem("senderId") ?? crypto.randomUUID()
    ).current;  


    useEffect(() => {

        localStorage.setItem("senderId", senderId);

        async function loadExisting(){
            const res = await fetch("http://localhost:8000/api/notes/");
            const data = await res.json();
            setMessages(data.map((note: any) => ({ id: note.id, action: "new", message: note.content, "sender_id" : note.sender_id})));
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

    const sendMessage = (title: string, message:string) => {
        socketRef.current?.send(JSON.stringify({action : "new", title, message, sender_id : senderId})); 
    };

    const deleteMessage = (id : number) => {
        socketRef.current?.send(JSON.stringify({action : "delete", id, sender_id : senderId}));
    }

    return {messages, sendMessage, deleteMessage, senderId};

}
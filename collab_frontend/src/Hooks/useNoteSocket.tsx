import { useEffect, useState, useRef } from 'react';

interface Message{
    id : number;
    action : string;
    message : string;
    sender_id : string;
}
type SocketError = string | null

export default function useNoteSocket(roomName : string) : { messages: Message[]; sendMessage: (title : string, message: string) => void; deleteMessage: (id: number) => void; senderId : string; error : SocketError; clearError : () => void }{
    const socketRef = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState<SocketError>(null);


    const senderId = useRef(
        localStorage.getItem("senderId") ?? crypto.randomUUID()
    ).current;  

    const clearError = () => {
        setError(null);
    }


    useEffect(() => {

        localStorage.setItem("senderId", senderId);

        async function loadExisting(){
            const res = await fetch(`http://localhost:8000/api/notes/?room_name=${roomName}`);
            const data = await res.json();
            setMessages(data.map((note: any) => ({ id: note.id, action: "new", message: note.content, "sender_id" : note.sender_id})));
        };
        loadExisting();

        const socket = new WebSocket(`ws://localhost:8000/ws/notes/${roomName}/`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.type === "message_created"){
                setMessages((prev) => [...prev, data]);
            }
            else if(data.type == "message_deleted"){
                setMessages((prev) => prev.filter((p) => data.id !== p.id))
            }
            else if(data.type === "error"){
                // console.log(data.message)
                setError(data.message)
            }
        };

        return () => {
            socket.close();
        };

    }, [roomName])

    const sendMessage = (title: string, message:string) => {
        socketRef.current?.send(JSON.stringify({action : "new", title, message, sender_id : senderId, room_name : roomName})); 
    };

    const deleteMessage = (id : number) => {
        socketRef.current?.send(JSON.stringify({action : "delete", id, sender_id : senderId}));
    }

    return {messages, sendMessage, deleteMessage, senderId, error, clearError};

}
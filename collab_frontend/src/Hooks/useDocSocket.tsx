import { useState, useEffect, useRef } from 'react';
import { data } from 'react-router-dom';

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export default function useDocSocket(roomName : string) : {text : string; sendText : (text : string) => void}{
    const [text, setText] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const debouncedSendRef = useRef(
        debounce((content : string) => {
            socketRef.current?.send(JSON.stringify({content}));
        }, 500)
    );

    useEffect(() => {
        async function loadExisting(){
            const response = await fetch(`http://localhost:8000/api/livedoc/?room_name=${roomName}`);
            if(!response.ok){console.log("Miss")}
            const dataArray = await response.json();
            const data = dataArray.length > 0 ? dataArray[0].content : "";
            setText(data);
        }
        loadExisting();
        
        const socket = new WebSocket(`ws://localhost:8000/ws/livedoc/${roomName}/`);
        socketRef.current = socket;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setText(data.content);
        }

        return(() => {
            socket.close();
        })

    }, [])

    const sendText = (newText : string) => {
        setText(newText);
        debouncedSendRef.current(newText);
    }

    return({text, sendText});

}
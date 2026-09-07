import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomPicker(){
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const createRoom = async () => {
        const roomName = room.trim();

        if(!roomName) return;

        setError("");

        const response = await fetch("http://127.0.0.1:8000/api/rooms/", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                name : roomName,
            }),
        });

        if(!response.ok) {
            setError("Room already exists.");
            return;
        }

        navigate(`chat/${roomName}/`);
    }

    const joinRoom = async () => {
        const roomName = room.trim();
        
        if(!roomName) return;

        setError("");

        const response = await fetch(`http://127.0.0.1:8000/api/rooms/?name=${roomName}`);
        
        if(!response.ok) return;

        const data = await response.json();
        if(data.length === 0) {
            setError("Room does not exist.")    
            return;
        }

        navigate(`chat/${roomName}/`);
    }

    return(
        <div className = "min-h-screen flex items-center justify-center bg-gray-950">
            <div className = "relative bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-sm">
                <h1 className = "text-2xl font-bold text-white mb-6">SyncBoard</h1>
                <p className = "text-gray-400 text-sm mb-6">Enter a room to get started</p>

                <input type="text" 
                value = {room} 
                onChange={(e) => setRoom(e.target.value)} 
                placeholder='Room name'
                className = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-blue-500 transition hover:border-blue-100"
                />
                <button 
                onClick = {createRoom}
                className = "flex-1 w-40 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition mb-2"
                >Create</button>
                <button 
                onClick = {joinRoom}
                className = "flex-1 w-40 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition"
                >Join</button>

                {error && (
                    <div className="absolute bottom-full left-0 mb-2 w-full rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                            {error}
                    </div>
                )}

            </div>
        </div>
    )

}
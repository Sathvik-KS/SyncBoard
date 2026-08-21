import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomPicker(){
    const [room, setRoom] = useState("");
    const navigate = useNavigate();

    const enterRoom = () => {
        if(!room.trim()) return;
        navigate(`chat/${room.trim()}/`);
    };

    return(
        <div className = "min-h-screen flex items-center justify-center bg-gray-950">
            <div className = "bg-gray-900 border border-gray-800 rounded-2xl p-10 w-full max-w-sm">
                <h1 className = "text-2xl font-bold text-white mb-6">SyncBoard</h1>
                <p className = "text-gray-400 text-sm mb-6">Enter a room to get started</p>
                <input type="text" 
                value = {room} 
                onChange={(e) => setRoom(e.target.value)} 
                placeholder='Room name'
                className = "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 mb-4 focus:outline-none focus:border-blue-500 transition hover:border-blue-100"
                />
                <button 
                onClick = {enterRoom}
                className = "w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition"
                >Go</button>
            </div>
        </div>
    )

}
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
        <div>
            <h2>Enter a room name</h2>
            <input type="text" value = {room} onChange={(e) => setRoom(e.target.value)} placeholder='Room name'/>
            <button onClick = {enterRoom}>Go</button>
        </div>
    )

}
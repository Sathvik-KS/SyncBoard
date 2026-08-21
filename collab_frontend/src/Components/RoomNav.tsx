import {Link, useParams} from 'react-router-dom';

export default function RoomNav(){
    const { roomName } = useParams();

    return(
        <div className = "px-5 min-h-12 flex justify-center items-center bg-slate-900">
            <nav className = "px-5 block w-sm flex justify-between text-slate-300">
                <Link to = "/" className = "hover:text-blue-400 transition">Home</Link>
                <Link to = {`/chat/${roomName}/`} className = "hover:text-blue-400 transition">Chat</Link>
                <Link to = {`/livedoc/${roomName}/`} className = "hover:text-blue-400 transition">Live Doc</Link>
            </nav>
        </div>
    )
}
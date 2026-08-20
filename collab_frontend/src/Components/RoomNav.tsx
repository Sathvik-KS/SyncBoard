import {Link, useParams} from 'react-router-dom';

export default function RoomNav(){
    const { roomName } = useParams();

    return(
        <nav>
            <Link to = "/">Home</Link>
            <Link to = {`/chat/${roomName}/`}>Chat</Link>
            <Link to = {`/livedoc/${roomName}/`}>Live Doc</Link>
        </nav>
    )
}
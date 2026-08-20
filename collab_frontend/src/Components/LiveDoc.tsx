// import { useState } from 'react';
import { useParams } from "react-router-dom";
import useDocSocket from "../Hooks/useDocSocket";
import RoomNav from "./RoomNav";

export default function LiveDoc(){
    const {roomName} = useParams();
    const {text, sendText} = useDocSocket(roomName as string);
    

    return(
        <>
        <RoomNav/>
        <div>
            <h2>Live document</h2>
            <textarea
                value = {text} onChange={e => sendText(e.target.value)}
                rows = {15}
                style = {{width : "100%", maxWidth : "600px", fontFamily : "inherit", fontSize : "14px"}}
            />
        </div>
        </>
    )

}
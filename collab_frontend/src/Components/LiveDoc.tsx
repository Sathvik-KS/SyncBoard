// import { useState } from 'react';
import { useParams } from "react-router-dom";
import useDocSocket from "../Hooks/useDocSocket";
import RoomNav from "./RoomNav";

export default function LiveDoc(){
    const {roomName} = useParams();
    const {text, sendText} = useDocSocket(roomName as string);
    

    return(
        <div className = "min-h-screen flex items-center justify-center bg-slate-950">
            <div className = "bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-2xl">
                <RoomNav/>
                <div>
                    <h2 className = "msg-enter-other text-white text-lg p-2">Live document</h2>
                    <textarea
                        value = {text} onChange={e => sendText(e.target.value)}
                        rows = {15}
                        className = "w-full mt-4 bg-slate-950 border border-slate-700 rounded-lg p-4 text-white focus:outline-none focus:border-blue-400 hover:border-slate-100 transition"    
                    />
                </div>
            </div>
        </div>
    )

}
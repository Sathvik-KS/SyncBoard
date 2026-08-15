// import { useState } from 'react';
import useDocSocket from "../Hooks/useDocSocket";

export default function LiveDoc(){
    const {text, sendText} = useDocSocket();
    // const [data, setData] = useState("");
    

    return(
        <div>
            <h2>Live document</h2>
            <textarea
                value = {text} onChange={e => sendText(e.target.value)}
                rows = {15}
                style = {{width : "100%", maxWidth : "600px", fontFamily : "inherit", fontSize : "14px"}}
            />
        </div>
    )

}
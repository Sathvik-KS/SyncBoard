import { useState, useEffect } from 'react';

interface Note{
    id : number;
    title : string;
    content : string;
}

type Status = "success" | "error" | "loading"

export default function useFetch() : [Note[], Status]{
    const [status, setStatus] = useState<Status>("loading");
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        async function getData(){
            try{
                const response = await fetch("http://127.0.0.1:8000/api/notes/");
                if(!response.ok){setStatus("error"); return;}
                const data = await response.json();
                setNotes(data);
                setStatus("success");
            }
            catch(error){setStatus("error");}
        };
        getData()
    }, [])

    return([notes, status]);
}
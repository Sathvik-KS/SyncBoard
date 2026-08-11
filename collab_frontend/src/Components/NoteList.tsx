import useFetch from '../Hooks/useFetch.tsx';

export default function NoteList(){
    const [notes, status] = useFetch();

    if(status === "error") return(<p>Failed</p>);
    if(status === "loading") return(<p>Loading...</p>);
    return(
        <>
            <ul>
                {notes.map(n => <li key = {n.id}>{n.title}</li>)}
            </ul>

        </>
    )
}
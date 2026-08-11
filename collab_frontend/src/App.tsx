import { Routes, BrowserRouter, Route } from 'react-router-dom';
import NoteList from './Components/NoteList.tsx';
import Chat from './Components/Chat.tsx';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<NoteList />}/>
        <Route path = "/chat" element = {<Chat />}/>
      </Routes>
    </BrowserRouter>
  )
}
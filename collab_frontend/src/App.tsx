import { Routes, BrowserRouter, Route } from 'react-router-dom';
import NoteList from './Components/NoteList.tsx';
import LiveDoc from './Components/LiveDoc.tsx';
import Chat from './Components/Chat.tsx';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<NoteList />}/>
        <Route path = "/chat" element = {<Chat />}/>
        <Route path = "/livedoc" element = {<LiveDoc />}/>
      </Routes>
    </BrowserRouter>
  )
}
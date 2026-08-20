import { Routes, BrowserRouter, Route } from 'react-router-dom';
// import NoteList from './Components/NoteList.tsx';
import RoomPicker from './Components/RoomPicker.tsx';
import LiveDoc from './Components/LiveDoc.tsx';
import Chat from './Components/Chat.tsx';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<RoomPicker />}/>
        <Route path = "/chat/:roomName/" element = {<Chat />}/>
        <Route path = "/livedoc/:roomName/" element = {<LiveDoc />}/>
      </Routes>
    </BrowserRouter>
  )
}
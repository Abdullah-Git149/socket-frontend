import './App.css';
import io from "socket.io-client"
import { useState } from "react"
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join__room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (


        <div className='joinChatContainer'>

          <h3>Join A Room..</h3>
          <input type="text" placeholder="Enter your name" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Enter room" onChange={(e) => setRoom(e.target.value)} onKeyPress={(e) => { e.key === "Enter" && joinRoom() }} />
          <button onClick={joinRoom} >Join A Room</button>
        </div>

      ) : (
        <Chat socket={socket} username={username} room={room} />
      )
      }
    </div>
  );
}

export default App;

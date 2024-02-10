import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [text, setText] = useState("");
  const [liveText, setLiveText] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(socket);
    if (text.trim() != "") {
      socket.emit("text", text);
    }

    
    return ()=>{
      console.log('close');
      socket.close();
    }
  }, [text]);

  socket?.on("liveText", (msg) => {
    console.log(msg);
    setLiveText(msg);
  });
  
  return (
    <div>
      <input
        type="text"
        value={liveText}
        onChange={(e) => setText(e.target.value)}
      />
      <div>{liveText}</div>
    </div>
  );
}

export default App;

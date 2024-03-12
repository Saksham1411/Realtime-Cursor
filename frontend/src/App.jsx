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
    console.log(socket);
    setSocket(socket);
  }, []);
  
  socket?.emit("text", text);

  socket?.on("liveText", (msg) => {
    setText(msg);
  });
  
  return (
    <div>
      <textarea
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

export default App;

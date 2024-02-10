const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:4000",
        methods:['GET','POST']
    },
    credentials:true
});

io.on('connection', (socket) => {
    console.log('connected',socket.id);

    socket.on('text',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('liveText',msg);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })
})



server.listen(4000, () => console.log('workingg...'));
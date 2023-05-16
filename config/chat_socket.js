const express = require("express");
const app = express();
const { on } = require("connect-mongo");
const cors = require("cors");
app.use(cors());
module.exports.chatSocket = function(socketServer){
  let io = require("socket.io")(socketServer,{
    cors: {
      origin: 'http://54.163.44.39:8000',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  })

  io.sockets.on('connection',function(socket){
        console.log("new connection received",socket.id);
  
       socket.on("disconnect", function(){
        console.log("socket disconnected");
       })

       socket.on("join_room",function(data){
        console.log("joining requiest reseave",data);

        socket.join(data.chatroom);

        io.in(data.chatroom).emit("user_joined",data);
       })

       //detect the send_message and brodcast to everyone in the room

       socket.on("send_message",function(data){
        io.in(data.chatroom).emit("reseive_message",data);
       })
    })
}
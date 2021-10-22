var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http , {
  cors: {
    origin: '*',
  }
});

const myMessages = []

io.on("connection",(socket)=>{

  console.log(socket)
  socket.on("disconnect", ()=>{
    console.log("X desconectou: " + socket.id)
})

  socket.on("send-message",(data)=>{
    myMessages.push(data)
    // socket.emit("text-event", myMessages)
    io.emit("text-event", myMessages)
    
  })
})


// io.on("connection",(socket)=>{

//     socket.on("disconnect", ()=>{
//         console.log("X desconectou: " + socket.id)
//     })

//     socket.on("msg", (data)=>{
//         io.emit("showmsg", data); // nesse caso o IO é o servidor , aparti do servidor emita pra todo mundo os dados que o cliente enviou pra mim!
//         console.log(data)
//     })
    

// })


// app.get("/", (req, res) => {
//   res.send('Rodando')
// });




http.listen(3000, () =>{
  console.log('Rodando na porta 3000')
})
const express=require('express');
const app=express();
const http=require("http").createServer(app);
const port=process.env.PORT||3000;
const path=require("path");

const public_path=path.join(__dirname,"../public");
app.use(express.static(public_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const hbs=require("hbs");
app.set("view engine","hbs");
const partial_path=path.join(__dirname,"../views/partials");
hbs.registerPartials(partial_path);


//socket
const io=require("socket.io")(http);
io.on("connection",(socket)=>{
    console.log("socket connected..");

    socket.on("message",(msg)=>{
        console.log(msg);
        socket.broadcast.emit('message',msg); 
    })
}) 

const route=require("../src/routes/route");
app.use(route);

http.listen(port,()=>{
    console.log("server is running on port num ",port);
});
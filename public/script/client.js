const socket=io();
let name;
let textarea=document.querySelector("#textarea");
let messageArea=document.querySelector(".message__area");
do{
   name= prompt("please enter your name");
}while(!name);

textarea.addEventListener("keyup",(e)=>{

    if(e.key=='Enter'){
        const s=e.target.value;
        textarea.value="";
        sendMessage(s);
    }
})

function sendMessage(msg){

    jsonmsg={
        user:name,
        message:msg.trim(),
    }
    //append message
    appendMessage(jsonmsg,'outgoing');

    //send server
    socket.emit('message',jsonmsg);
}

function appendMessage(msg,type){

    let classtype=type;
    let maindiv=document.createElement('div');
    maindiv.classList.add(classtype,'message');

    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    maindiv.innerHTML=markup;
    messageArea.appendChild(maindiv);
}


//receive msg
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
})

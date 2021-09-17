var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http =require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

//middlewares
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))//make the posted message appear instead of just empty object


var Message = mongoose.model('Message',{
    name: String,
    message: String
})
var messages =[
    {
        name: "Johnnie",
        message: "Cool man"
    },
    {
        name: "Jayson",
        message: "Hello Doe"
    }
]

app.get('/messages', (req, res)=>{
    res.send(messages);
})

app.post('/messages', (req, res)=>{
    //saving data to mongoDb
    var message = new Message(req.body)
 
    //message.save((err)=>{
        //if(err) sendStatus(500)

        messages.push(req.body) //push a new object to the list
        io.emit('message', req.body)
        res.sendStatus(200);
    //})  
       
    
})
io.on('connection', (socket)=>{
    //console.log('user connected');

})


//replaced app.listen with http.listen
var server = http.listen(5000, ()=>{
    console.log("listening on port ", server.address().port)
})
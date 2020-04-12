var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt=require('jsonwebtoken');

var messages= [{
    text:"This is a text sample",
    owner:"Zimple"
},
{
    text:"This is 2nd test sample",
    owner:"Rinny"
}]

var users=[{firstName:'a',lastName:'b',email:'a',password:'a',id:0}];

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
var api = express.Router();
var auth = express.Router();

api.get('/messages',(req,res)=>{
    res.json(messages);
})

api.get('/messages/:user',(req,res)=>{
    var user = req.params.user;
    var result = messages.filter(messages=>messages.owner===user);
    res.json(result);
})

api.post('/messages',(req,res)=>{
    messages.push(req.body);
    res.sendStatus(200);
})

api.get('/users/me',checkAuthenticated,(req,res)=>{
    res.json(users[req.user]);
})

api.post('/users/me',checkAuthenticated,(req,res)=>{
    var user = users[req.user];
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
    res.json(user);
})

auth.post('/register',(req,res)=>{
    var index = users.push(req.body) - 1;
    var user=users[index];
    user.id=index;
    sendToken(user,res);
})

auth.post('/login',(req,res)=>{
    var user = users.find(user => user.email === req.body.email);
    if(!user) sendAuthError(res)
    if(user.password === req.body.password) sendToken(user,res)
    else sendAuthError(res)
})

function sendToken(user,res){
    var token=jwt.sign(user.id,'123');
    res.json({firstName:user.firstName,token:token});
}

function sendAuthError(res){
    return res.json({success: false, message: 'Email or Password Incorrect'})
}

function checkAuthenticated(req,res,next){
    if(!req.header('authorization')) return res.status(401).send({message:'Unauthorized requested. Missing authentication header'})
    var token = req.header('authorization').split(' ')[1];
    var payload = jwt.decode(token,'123')

    if(!payload) return res.status(401).send({messages:"Unauthorized request. Authentication header is inavalid"})

    req.user = payload;

    next();
}
app.use('/api',api);
app.use('/auth',auth);

app.listen(1234);
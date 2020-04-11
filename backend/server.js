var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var messages= [{
    text:"This is a text sample",
    owner:"Zimple"
},
{
    text:"This is 2nd test sample",
    owner:"Rinny"
}]

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
var api = express.Router();

api.get('/messages',(req,res)=>{
    res.json(messages);
})

api.post('/messages',(req,res)=>{
    messages.push(req.body);
    res.json(req.body);
})
app.use('/api',api);
app.listen(1234);
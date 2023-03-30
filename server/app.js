const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express')
const app = express();
const connectDB = require("./db/connect");
//const User = require('./models/userschema');

dotenv.config({ path: './config.env'});  

app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/recip'));

//Middleware
//const middleware = (req, res, next) => {
//    console.log("Hello middlware");
//    next();
//}

//app.get('/', (req, res)=>{
//    res.send("Hello");
//});

//app.get('/about',middleware, (req, res)=>{
//    res.send("Hello about");
//    connectDB();
//});
app.get('/contact', (req, res)=>{
    res.send("Hello contact");
});

app.listen(3001, () =>{
    console.log("Server");
}
)
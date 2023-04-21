const mongoose = require('mongoose');
const express = require('express')
const app = express();

const uri= "mongodb+srv://saimali:brotherhood@cluster0.etcwjlk.mongodb.net/MealMaven?retryWrites=true&w=majority";

/*const connectDB = () =>{
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(()=>{console.log("Connection successful");
    }).catch((err)=> console.log("error conn"));
}*/

mongoose.connect(uri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false
}).then(()=> {
    console.log("Connection successful");
}).catch((err)=> console.log("No conn"));

//module.exports =connectDB;
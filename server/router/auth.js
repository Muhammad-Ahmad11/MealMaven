const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
const cokie = require ('cookie-parser');
router.use(cokie());

require('../db/connect'); 
const User = require("../models/userschema");

router.get('/', (req, res) => {
    res.send("Hello from server");
});


router.post('/register', async (req, res) => {
const { name, email, phone, password, cpassword} =req.body;

    if(!name || !email || !phone || !password || !cpassword)
    {
        return res.status(422).json({error: "plz add info full"});
    }
    else{
    try
    {
        const userExist = await User.findOne({email:email});

        if(userExist) {
            return res.status(422).json({error: "Email already exists"});
        } else if(password!==cpassword)
        {
            return res.status(422).json({error: "Passwords not matching"});
        }
        else {
            const user = new User({name, email, phone, password, cpassword});
            
            const userRegister = await user.save();

            if(userRegister) {
                
                return res.status(500).json({message: "Regist Successful"});
            } else {
                return res.status(422).json({error: "Regist Fail"});
            } 
        }

    } catch(err) {
        console.log(err);
    }
    }

    
});

//login

router.post('/signin', async (req, res)=> {
    //console.log(req.body);
    //res.json({message: "awesome"} );
    try {
        let token;
        const { email, password } = req.body;

        if(!email || !password)
        {
            return res.status(400).json({ error: "Plz fill the data" })
        }

        const userLogin = await User.findOne({ email:email });
        //console.log(userLogin);

        if(userLogin)
        {
            var isMatch = (password==userLogin.password);
        }

        


        if(userLogin)
        {
            token = await userLogin.generateAuthToken();
            console.log(token);
            console.log("token")

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });

            if(!isMatch)
            {
                res.status(400).json({ error: "Invalid Credentials pass"});
            }
            else{
                res.json({ message: "Sign in successful"});
            }
        }
        else{
            res.status(400).json({ error: "Invalid Credentials email"});
        }

       
        

    } catch(err) {
        console.log(err);
    }
});

router.get('/UserHome', authenticate, (req, res)=>{
    //res.send("Hello contact");
    res.send(req.rootUser);
});

//Get user data for daily activity page
router.get('/DailyActivity', authenticate, (req, res)=>{
    //res.send("Hello contact");
    res.send(req.rootUser);
});

router.post('/DailyActivityPost', authenticate, async (req, res)=>{
    try {
        const {foodIntake, steps} = req.body; 

        if(!foodIntake || !steps)
        {
            //console.log(foodIntake);
            console.log("error in activity form");
            return res.json({error: "plz fill full activity"}); 
        }

        const userActivity = await User.findOne({ _id: req.userID });

        if(userActivity)
        {
            const userAct = await userActivity.addAct(foodIntake, steps);
            
            await userActivity.save();

            res.status(201).json({message:"Activity saved succesful"});
        }


    } catch(error) {
        console.log(error);
    }
});




module.exports = router;
// define logic function

const users = require("../Model/userSchema");

// import jwt for create token
const jwt = require('jsonwebtoken')



// register function logic
exports.register=async(req,res)=>{
    console.log("inside register function");
    try {
        const {username,email,password} =req.body
        console.log(`${username} ${email} ${password}`);

        const existingUser =await users.findOne({email})
        if(existingUser){
            res.status(402).json("user already exists")
        }
        else{
            const newUser = new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()//data saved in mongodb
            res.status(200).json("user created successfully")
        }
    } catch (err) {
        res.status(500).json("server error")
    }
   
}

// login function logic
exports.login=async(req,res)=>{
    const{email,password} =req.body
    try{
        const user = await users.findOne({email,password})
        if(user){
            // token creation
            const token = jwt.sign({userId:user.id},"superkey2024")
            console.log(token);
            res.status(200).json({user,token}) //login successfull

        }
        else{
            res.status(401).json("invalid user")
        }
    }
    catch(err){
        res.status(500).json("server error" +err.message)
    }
}


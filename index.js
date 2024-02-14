// load .env file contents into process.env by default

require('dotenv').config()

// import express and cors

const express =require('express')

const cors =require('cors')

// import mongoDB
const db=require("./DB/connection")

const router = require('./Routes/router')

// import middleware
const appMiddleware =require("./Middleware/appMiddleware")


// create backend application using express

const pfServer =express() //Creates an Express application.

// use cors

pfServer.use(cors())
pfServer.use(express.json()) //Returns middleware that only parses json 
pfServer.use(appMiddleware)
pfServer.use(router)
pfServer.use('/uploads',express.static('/uploads')) //image exporting to frontend

// port creation

const PORT =4000 || process.env.PORT


// server listening
pfServer.listen(PORT,()=>{
    console.log("listening on port " +PORT);
})

// localhost:4000 -> res pfServer is started....
pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project fair server started</h1>`)
})
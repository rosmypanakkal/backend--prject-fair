// import express
const express =require('express')
const userController = require('../Controllers/userController')

// import projectcontroller
const projectController =require('../Controllers/projectController')

const jwtMiddleware=require("../Middleware/jwtMiddleware")


// import multer
const multerConfig = require('../Middleware/multerMiddleware')

// create router object of express to define path

const router = new express.Router()

// using router object to define path

// register API path -http://localhost:4000/register
router.post('/register',userController.register)


// login API path -http://localhost:4000/login
router.post('/login',userController.login)

// add user project api path -http://localhost:4000/project/add
router.post('/project/add',jwtMiddleware, multerConfig.single('projectImage'),projectController.addUserProject)

// get all user project path- http://localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAllUserProjects)

// get all user project path- http://localhost:4000/project/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

// get all user project path- http://localhost:4000/project/home-projects
router.get('/project/home-projects',projectController.getHomeProject)

// update project path- http://localhost:4000/project/update-projects/56789006
router.put('/project/update-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateProject)

// delete project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

module.exports =router
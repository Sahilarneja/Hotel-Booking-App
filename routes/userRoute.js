const express=require('express');
const userRoute= express.Router();
const { registerController , loginController} = require('../Controller/userController');

userRoute.post('/register', registerController);
userRoute.post('/login', loginController);

module.exports = userRoute;
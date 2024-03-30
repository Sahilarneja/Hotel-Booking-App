const express = require('express');
const roomRouter=express.Router();

const {GetRoomsController, AddRoomsController, GetRoomControllerById} = require('../Controller/roomController');

roomRouter.get('/getRooms', GetRoomsController);
roomRouter.post('/addRooms',AddRoomsController);
roomRouter.post('/getRoomById/:id', GetRoomControllerById);
module.exports= roomRouter;
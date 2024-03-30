const mongoose=require('mongoose');
const {v4}=require('uuid');
const room=require('../models/room');
const roomModel = require('../models/room');

const GetRoomsController=async(req,res)=>{
    try{
        const rooms=await room.find();
        if(rooms.length==0){
            res.status(404).json({message: 'Room not found'});
        }else{
            res.status(200).json({rooms: rooms});
        }
    }catch(error){
        res.status(500).json({message:"Internal server error", error:error.message});
    }
    };

const AddRoomsController = async (req, res) => {
    try {
        const { name, maxCount, phoneNumber, rentPerDay, imageUrls, type, description } = req.body;

        console.log('Received request body:', req.body);

        // Validation
        if (!name || !maxCount || !phoneNumber || !rentPerDay || !type || !description) {
            console.log('Validation failed. Missing required fields.');
            return res.status(400).json({ error: 'name, maxCount, phoneNumber, rentPerDay, type, and description are required fields' });
        }

        // Generate a unique 4-digit room ID
        const roomId = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

        // Create a new room instance
        const newRoom = new room({
            roomId: roomId,
            name: name,
            maxCount: maxCount,
            phoneNumber: phoneNumber,
            rentPerDay: rentPerDay,
            imageUrls: imageUrls,
            type: type,
            description: description
        });

        // Save the room to the database
        await newRoom.save();

        console.log('Room created successfully:', newRoom);
        return res.status(201).json({ message: 'Room Created Successfully', data: newRoom });
    } catch (error) {
        console.error('Error creating room:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const GetRoomControllerById = async (req, res) => {
    const roomId = req.params.id; // Assuming roomId is passed as a URL parameter
    try {
        const room = await roomModel.findOne({ _id: roomId });
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.send(room);
    } catch (error) {
        console.error("Error fetching room by ID:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {GetRoomsController, AddRoomsController, GetRoomControllerById};
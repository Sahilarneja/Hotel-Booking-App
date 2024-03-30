const express=require("express");
const connection = require("./connection");
const roomRouter = require("./routes/roomsRoute");
const cors = require('cors');
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");


const app=express();
// app.use(cors()) enables CORS for all routes in your Express.js application. This will include the Access-Control-Allow-Origin header in all responses, allowing requests from any origin.
app.use(cors());

app.use(express.json());
app.use('/api', roomRouter);
app.use('/api', userRoute)
app.use('/api', bookingRoute);

connection();
const port=process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("Node server started");
})
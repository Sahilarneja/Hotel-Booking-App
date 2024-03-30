const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Room = require("../models/room"); // Import Room model

router.post("/bookroom", async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays } = req.body;

  try {
    // Validate request body parameters here if needed

    // Create a new booking
    const newBooking = new Booking({
      room: room.name,
      roomId: room._id,
      userId,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      transactionId: generateTransactionId(),
    });

    // Save the booking to the database
    const booking = await newBooking.save();

    // Update the room's current bookings
    const updatedRoom = await Room.findByIdAndUpdate(
      room._id,
      {
        $push: {
          currentBookings: {
            bookingId: booking._id,
            fromDate,
            toDate,
            userId,
            status: booking.status,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Room booked successfully", booking });
  } catch (error) {
    console.error("Error booking room:", error);
    res.status(500).json({ error: "An error occurred while booking the room" });
  }
});

// Function to generate a unique transaction ID
function generateTransactionId() {
  // Implement your logic for generating transaction ID here
  return "1234";
}

module.exports = router;

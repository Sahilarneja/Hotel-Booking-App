const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4 correctly
const Room = require("../models/room");
const stripe = require("stripe")(
  "sk_test_51P5Ok1SAND1biVNiNbfjDktfCsRjkdFFjYTMBLrCDUJBSyUSUtKmD5nzcIx8gxQiuvARONoKJ1sWCzMMefScmGo8000yKE1yg6"
);

router.post("/bookroom", async (req, res) => {
  const { room, userId, fromDate, toDate, totalAmount, totalDays, token } = req.body;

  try {
    // Create a PaymentMethod using the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: token.id
      }
    });

    // Create a SetupIntent or PaymentIntent with the PaymentMethod
    const intent = await stripe.setupIntents.create({
      payment_method: paymentMethod.id,
      customer: userId, // Assuming userId is the Stripe Customer ID
      setup_future_usage: 'off_session' // Indicate how the PaymentMethod will be used in the future
    });

    // Check if SetupIntent/PaymentIntent was successful
    if (intent.status === 'succeeded') {
      // Proceed with the room booking process
      // Create a new booking object
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

      // Return success response
      console.log("Room successfully booked");
      return res.status(200).json({ message: "Room booked successfully", booking });
    }
  } catch (error) {
    console.error("Error booking room:", error);
    return res.status(500).json({ error: "An error occurred while booking the room" });
  }

  // If the flow reaches here, there was an error in the booking process
  console.log("Payment successful, but room booking failed");
  res.status(500).json({ error: "An error occurred while booking the room" });
});

// Function to generate a unique transaction ID
function generateTransactionId() {
  // Implement your logic for generating transaction ID here
  return uuidv4();
}

module.exports = router;

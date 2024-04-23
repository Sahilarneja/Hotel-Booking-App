import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "../Components/Room.css";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";

const BookingScreen = () => {
  const { roomId, fromDate, toDate } = useParams(); // Extract roomId using useParams
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState();

  const totalDays = moment(toDate, "DD-MM-YYYY").diff(
    moment(fromDate, "DD-MM-YYYY"),
    "days"
  );

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/getRoomById/${roomId}`
        );
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRoomById();
  }, [roomId]); // Pass roomId as dependency

  useEffect(() => {
    if (room && totalDays) {
      const amount = room.rentPerDay * totalDays;
      setTotalAmount(amount);
    }
  }, [room, totalDays]);



  async function onToken(token) {
    console.log(token);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      console.error("Current user not found in local storage");
      return;
    }
  
    const bookingDetails = {
      room,
      userId: currentUser._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };
  
    try {
      const response = await axios.post(
        `http://localhost:5000/api/bookroom`,
        bookingDetails
      );
      console.log("Booking successful:", response.data);
      // Redirect to confirmation page or display success message
    } catch (error) {
      console.error("Error booking room:", error);
    }
  }
  
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      {room && (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1>{room.name}</h1>
              <img src={room.imageUrls[0]} alt={room.name} className="bigimg" />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />

                <b>
                  <p>Name : {currentUser ? currentUser.name : "N/A"}</p>

                  <p>From Date : {fromDate}</p>
                  <p>To Date : {toDate}</p>
                  <p>Max Count: {room.maxCount} </p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totalDays}</p>
                  <p>Rent per day : {room.rentPerDay}</p>
                  <p>Total Amount: {totalAmount}</p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51P5Ok1SAND1biVNiQ3fuRWNm5E2GC2bvHqAVfP3hES43mfxfbbrnyZOmBy4nFkdYOIfViqyMYH9bz9xiCmhtw98300P8NFCJOv"
                >
                  <button className="btn btn-primary" >
                  Pay Now
                </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingScreen;

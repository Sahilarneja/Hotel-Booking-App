import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../Components/Room';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import { DatePicker } from 'antd';
import moment from 'moment';

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [duplicateRooms, setDuplicateRooms] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getRooms');
        setRooms(response.data.rooms);
        setDuplicateRooms(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function filterByDate(dates) {
    setFromDate(dates[0] ? dates[0].format('DD-MM-YYYY') : null);
    setToDate(dates[1] ? dates[1].format('DD-MM-YYYY') : null);
  
    // Check if duplicateRooms is iterable
    if (!duplicateRooms || !Array.isArray(duplicateRooms)) {
      console.error('Duplicate rooms data is missing or not iterable');
      return; // Exit early if duplicateRooms data is not iterable
    }
  
    var tempRooms = []; // Initialize an empty array to store available rooms
    for (const room of duplicateRooms) {
      var availability = true; // Initialize availability flag for each room
      if (room.currentBookings.length > 0) {
        for (const booking of room.currentBookings) {
          // Check if the current booking overlaps with the selected dates
          if (
            moment(dates[0]).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
            moment(dates[1]).isBetween(booking.fromDate, booking.toDate, null, '[]') ||
            moment(booking.fromDate).isBetween(dates[0], dates[1], null, '[]') ||
            moment(booking.toDate).isBetween(dates[0], dates[1], null, '[]')
          ) {
            availability = false; // Set availability flag to false if there's an overlap
            break; // No need to check further bookings if overlap found
          }
        }
      }
      // If room is available (availability flag is still true) or there are no bookings, add it to tempRooms
      if (availability) {
        tempRooms.push(room);
      }
    }
    setRooms(tempRooms); // Update rooms state with available rooms
  }
  

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-3'>
          {/* Correct usage of RangePicker */}
          <DatePicker.RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>
      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          rooms.map((room, index) => (
            <div key={index} className='col-md-9 mt-2'>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeScreen;

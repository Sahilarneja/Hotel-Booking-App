import React, { useState } from "react";
import "./Room.css";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageUrls[0]} className="smalling" />
      </div>

      <div className="col-md-7">
        <h1 className="room-title">{room.name}</h1>
        <div className="room-details">
          <p>
            <strong>Max Count:</strong> {room.maxCount}
          </p>
          <p>
            <strong>Phone Number:</strong> {room.phoneNumber}
          </p>
          <p>
            <strong>Type:</strong> {room.type}
          </p>
        </div>

        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2">Book Now</button>
            </Link>
          )}
          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      {/* react-bootstrap modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* react-bootstrap Carousel */}
          <Carousel prevLabel="" nextLabel="">
            {room.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;

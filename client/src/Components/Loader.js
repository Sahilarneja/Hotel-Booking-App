import React from 'react'
import { PulseLoader } from 'react-spinners';
import './Room.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <PulseLoader color="#3498db" loading={true} size={60} />
    </div>
  )
}

export default Loader

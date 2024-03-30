import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Components/Loader';
import Error from '../Components/Error';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState('');

  async function login(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const user = {
      email,
      password
    };

    setLoading(true); // Set loading state to true while fetching data

    try {
      const response = await axios.post(`http://localhost:5000/api/login`, user);
      const result = response.data;
      console.log("login successful:", result);
    
      // Display success message
      toast.success("Login successful!");
      localStorage.setItem('currentUser', JSON.stringify(result));
      window.location.href='/home';
    } catch (error) {
      if (error.response) {
        // Request was made and server responded with a non-2xx status code
        console.error("Error logging in user:", error.response.data);
        const errorMessage = error.response.data.message || "Login failed. Please check your email and password.";
        setError(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error logging in user:", error.request);
        setError("Server error. Please try again later.");
      } else {
        // Something else happened in making the request that triggered an error
        console.error("Error logging in user:", error.message);
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  }

  return (
    <div className="container">
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <div className="bs">
            <h2>Login</h2>
            <form onSubmit={login}>
              <input type='email' className='form-control mb-3' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type='password' className='form-control mb-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              {loading && <Loader />} {/* Render Loader component when loading is true */}
              {error && <Error message={error} />} {/* Render Error component when error is present */}
              <button type="submit" className="btn btn-primary mt-3" disabled={loading}>Login</button> {/* Disable button when loading */}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Add toast container */}
    </div>
  );
};

export default LoginScreen;

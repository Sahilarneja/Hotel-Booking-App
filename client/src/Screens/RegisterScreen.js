import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cpassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const user = {
      name,
      email,
      password
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/register`, user);
      const result = response.data;
      console.log("Registration successful:", result);
      toast.success("Registration successful!");
      setName('');
      setEmail('');
      setPassword('');
      setCpassword('');
      setError('');
    } catch (error) {
      console.error("Error registering user:", error.response.data);
      setError("Registration failed. Please try again.");
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'cpassword':
        setCpassword(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          <div className="bs">
            <h2>Register</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={register}>
              <input type='text' className='form-control mb-3' placeholder='Name' name="name" value={name} onChange={handleChange} />
              <input type='email' className='form-control mb-3' placeholder='Email' name="email" value={email} onChange={handleChange} />
              <input type='password' className='form-control mb-3' placeholder='Password' name="password" value={password} onChange={handleChange} />
              <input type='password' className='form-control mb-3' placeholder='Confirm Password' name="cpassword" value={cpassword} onChange={handleChange} />
              <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterScreen;

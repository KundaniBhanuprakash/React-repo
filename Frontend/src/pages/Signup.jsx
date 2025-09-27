import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 1500); // Redirect to login
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              required className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required className="w-full p-2 border rounded"/>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

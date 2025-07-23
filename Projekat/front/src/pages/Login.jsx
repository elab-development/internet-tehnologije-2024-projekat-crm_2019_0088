import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  User,
  Lock,
  Mail,
  Building,
  UserCheck,
} from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. CSRF token
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      });

      // 2. Login request
      await axios.post('http://localhost:8000/login', credentials, {
        withCredentials: true,
      });

      // 3. Fetch user
      const { data } = await axios.get('http://localhost:8000/api/user', {
        withCredentials: true,
      });
      setUser(data);

      // 4. Navigate
      navigate('/invoice');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-10">
      <h2 className="text-xl mb-4">Login</h2>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-3">
        <div>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

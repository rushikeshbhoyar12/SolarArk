import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate to dashboard or protected route
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Dashboard Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
          <div className="flex space-x-32">
            <div className="text-sm text-center">
              <a href="#" className="text-orange-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <div className="text-sm text-center">
              <a href="/signup" className="text-orange-500 hover:underline">
                Don't have an account? Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardLogin;

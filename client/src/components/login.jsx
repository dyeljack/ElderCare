import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css"; // Import the CSS file for styling
// import tailwindcss from "@tailwindcss/vite";

const Login = () => {
  const [loginMethod, setLoginMethod] = useState("email");

  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      email: loginMethod === "email" ? formData.email : "",
      phoneNumber:
        loginMethod === "phone" ? formData.phoneNumber : "",
      password: formData.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login", // Replace with your backend URL
        payload
      );

      alert("Login Successful!");

      console.log(response.data);

      // Example:
      // localStorage.setItem("token", response.data.token);
      // navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          ElderCare
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to your account
        </p>

        {/* Login Type */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              loginMethod === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Email
          </button>

          <button
            type="button"
            onClick={() => setLoginMethod("phone")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              loginMethod === "phone"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {loginMethod === "email" ? (
            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 font-semibold hover:underline"
  >
    Register
  </Link>
</p>

      </div>
    </div>
  );
};

export default Login;
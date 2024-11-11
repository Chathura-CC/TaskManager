import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUserAsync } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(
        signupUserAsync({ username, email, password, role })
      ).unwrap();
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-center md:text-4xl">
          Sign Up
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSignup} className="max-w-sm mx-auto space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-green-500 text-white rounded-md"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;

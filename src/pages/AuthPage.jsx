import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = isSignIn
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/signup";

      const response = await axios.post(url, data);
      alert("Success: " + response.data.message);

      if (isSignIn) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setIsSignIn(true);
      }
    } catch (error) {
      alert("Error: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-black/80 backdrop-blur-md border-2 border-dashed border-yellow-400 text-white rounded-2xl p-10 w-full max-w-md mx-4 shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-2">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-center text-gray-300 mb-6">
          {isSignIn ? "Sign in to book your seats 🍿" : "Join our movieverse 🎬"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {!isSignIn && (
            <div className="relative">
              <User className="absolute top-3 left-3 text-yellow-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-yellow-500/10 border border-yellow-500/20 text-white placeholder-yellow-300 rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-sm text-yellow-500 mt-1">{errors.name.message}</p>}
            </div>
          )}
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-yellow-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-yellow-500/10 border border-yellow-500/20 text-white placeholder-yellow-300 rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-sm text-yellow-500 mt-1">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-yellow-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-yellow-500/10 border border-yellow-500/20 text-white placeholder-yellow-300 rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && <p className="text-sm text-yellow-500 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition duration-200"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-yellow-400 hover:underline font-medium"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;

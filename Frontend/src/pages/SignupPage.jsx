import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AuthWrapper } from "../components/ui/AuthWrapper";
import { InputField } from "../components/ui/InputField";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';
import axios from 'axios'; // Added axios import

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const toast = useToast();

  function PostDetails(pics) {
    setLoading(true);

    if (!pics) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dty2xyvtn");
      fetch("https://api.cloudinary.com/v1_1/dty2xyvtn/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Cloudinary response:", data);
          if (data.url) {
            setPic(data.url.toString());
          } else {
            toast({
              title: "Upload Failed",
              description: "Invalid response from server.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          toast({
            title: "Upload Failed",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     if (!name || !password || !email || !confirmPassword) {
        toast({
          title: "Please Fill All the fields.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Passwords Do not Match",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      const response = await axios.post("http://localhost:5000/api/user", {
        email,
        name,
        password,
        pic,
      });

      // Check if response contains data
      if (response && response.data) {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
       
        if (response.data.token) {
          localStorage.setItem("userToken", response.data.token);
        }
        navigate("/chats");
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.message || error.message || "An error occurred during registration";
      toast({
        title: "Error Occurred!",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/me', {
          withCredentials: true
        });
        navigate('/chats');
      } catch (error) {
        // Optional: Handle specific error cases
      } finally {
        setIsCheckingAuth(false);
      }
    };
  
    checkAuth();
  }, [navigate]);

  if (isCheckingAuth) {
    return <> Wait... </>;
  }
  

  return (
    <AuthWrapper title="Create Account">
      <form onSubmit={submitHandler} className="space-y-6">
        <InputField
          icon={User}
          type="text"
          placeholder="Username"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          icon={Mail}
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />

        <InputField
          icon={Lock}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          showPassword={showConfirmPassword}
          togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div className="relative">
          <input
            type="file"
            onChange={(e) => PostDetails(e.target.files[0])}
            accept="image/*"
            className="text-zinc-400 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors duration-300 
              flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{loading ? "Creating Account..." : "Create Account"}</span>
        </motion.button>

        <div className="text-center text-zinc-400 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Login
          </a>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default Signup;
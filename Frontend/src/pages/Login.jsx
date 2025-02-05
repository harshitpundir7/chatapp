import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { AuthWrapper } from '../components/ui/AuthWrapper';
import { InputField } from '../components/ui/InputField';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!email || !password) {
            toast({
                title: "Please fill all the fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post("http://localhost:5000/api/user/login", { email, password }, {withCredentials: true});
            console.log(data);
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            setLoading(false);
            navigate('/chats');
        } catch (error) {
            toast({
                title: "Login Failed",
                description: error.response?.data?.message || "Something went wrong.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
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
        <AuthWrapper title="Login">
            <form onSubmit={submitHandler} className="space-y-6 w-full">
                {/* Email Input */}
                <InputField
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <InputField
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPassword={showPassword}
                    togglePasswordVisibility={() => setShowPassword(!showPassword)}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="form-checkbox rounded text-blue-600 bg-zinc-900 border-zinc-700"
                        />
                        <span className="text-zinc-400 text-sm sm:text-base">Remember me</span>
                    </label>
                    <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors text-sm sm:text-base">
                        Forgot Password?
                    </a>
                </div>

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-lg text-lg transition-colors duration-300 flex items-center justify-center space-x-2 ${
                        loading
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                >
                    <span>{loading ? "Logging in..." : "Login"}</span>
                </motion.button>

                {/* Signup Redirect */}
                <div className="text-center text-zinc-400 mt-4 text-sm sm:text-base">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:text-blue-400 transition-colors">
                        Sign Up
                    </a>
                </div>
            </form>
        </AuthWrapper>
    );
};

export default Login;

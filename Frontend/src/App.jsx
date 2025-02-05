import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ChatPage from './components/ChatPage';
import { ChakraProvider } from "@chakra-ui/react"; 
import Signup from './pages/SignupPage';
import Login from './pages/Login'

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/chats' element={<ChatPage/>} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import { ChakraProvider } from "@chakra-ui/react"; 
import Signup from './pages/SignupPage';
import Login from './pages/Login'
import { ChatProvider } from './context/ChatProvider';

export default function App() {
  return (
    

    <ChakraProvider>
      <Router>
      <ChatProvider>
        <div className="min-h-screen bg-black">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/chats' element={<ChatPage/>} />
          </Routes>
        </div>
    </ChatProvider>
      </Router>
    </ChakraProvider>
  );
}

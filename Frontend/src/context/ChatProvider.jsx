import { createContext, useEffect, useMemo, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/user/me', {
            withCredentials: true
          });
          setUser(response.data);
        } catch (error) {
          navigate('/');
        }
      };
      fetchUser();
    }, []);
  

    const contextValue = useMemo(() => ({
        user, 
        setUser, 
        selectedChat, 
        setSelectedChat, 
        chats, 
        setChats
    }), [user, selectedChat, chats]);

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    );
};


export const ChatState = () => {
    return useContext(ChatContext);
};

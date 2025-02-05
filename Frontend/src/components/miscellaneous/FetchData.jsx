import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios';
import { getSender } from '../../config/ChatLogic';
// import GroupChatModal from './GroupChatModal';

function FetchData({ fetchAgain }) {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState(null);

  // In FetchData.js
const fetchChats = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/chat", {
      withCredentials: true // Add this for cookie authentication
    });
    setChats(data);
  } catch (error) {
    console.error("Chat fetch error:", error);
    alert("Error: " + (error.response?.data?.message || "Failed to load chats"));
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      // Verify authentication status first
      const { data: userData } = await axios.get(
        "http://localhost:5000/api/user/me",
        { withCredentials: true }
      );
      setLoggedUser(userData);
      await fetchChats();
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  };

  fetchData();
}, [fetchAgain]);



  return (
    <div style={{ display:'flex', flexDirection: 'column', padding: '10px', border: '1px solid black', width: '30%', minHeight: '400px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px' }}>
        <h2>My Chats</h2>
        {/* <GroupChatModal>
          <button>New Group Chat</button>
        </GroupChatModal> */}
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto', padding: '10px', border: '1px solid gray' }}>
        {chats ? (
          <div>
            {chats.map((chat) => (
              <div 
                key={chat._id} 
                onClick={() => setSelectedChat(chat)}
                style={{ cursor: 'pointer', padding: '10px', marginBottom: '5px', background: selectedChat === chat ? '#38B2AC' : '#E8E8E8', color: selectedChat === chat ? 'white' : 'black', borderRadius: '5px' }}>
                <p>{!chat.isGroupChat ? getSender(loggedUser, chat.users) : chat.chatName}</p>
                {chat.latestMessage && (
                  <p style={{ fontSize: '12px' }}>
                    <strong>{chat.latestMessage.sender.name}:</strong> {chat.latestMessage.content.length > 50 ? chat.latestMessage.content.substring(0, 51) + "..." : chat.latestMessage.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>Wait...</>
        )}
      </div>
    </div>
  );
}

export default FetchData;

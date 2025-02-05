import React, { useState, useContext } from "react";
import { ChatContext } from "../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
  if (!search) {
    alert("Please enter something in search.");
    return;
  }
  try {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:5000/api/user?search=${search}`,
      { withCredentials: true }
    );
    setSearchResult(Array.isArray(data) ? data : []);
  } catch (error) {
    alert("Error fetching search results.");
  } finally {
    setLoading(false);
  }
};
const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { userId },
        { 
          withCredentials: true, // Add this instead of manual headers
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setIsOpen(false);
    } catch (error) {
      alert("Error fetching the chat: " + (error.response?.data?.message || error.message));
    } finally {
      setLoadingChat(false);
    }
  };

  const logOutHandler = () => {
    axios.post(
      "http://localhost:5000/api/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>Search User</button>
        <span>Talky</span>
        <button onClick={logOutHandler}>Logout</button>
      </div>

      {isOpen && (
        <div>
          <h2>Search User</h2>
          <input
            type="text"
            placeholder="Search User by name and Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Go</button>

          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResult.map((user) => (
              <div key={user._id} onClick={() => accessChat(user._id)}>
                {user.name}
              </div>
            ))
          )}

          {loadingChat && <p>Loading chat...</p>}
        </div>
      )}
    </div>
  );
}

export default Navbar;

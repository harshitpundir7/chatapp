import Chat from "../model/chatModel.js";

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res
      .status(400)
      .json({ message: "UserId parameter not sent with request" });
  }
  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [req.user._id, userId] },
    })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email" },
      });

    if (chat) {
      return res.json(chat);
    }

    const newChat = await Chat.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });
    const fullChat = await Chat.findById(newChat._id).populate(
      "users",
      "-password"
    );

    res.status(200).json(fullChat);
  } catch (error) {}
};


const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({ users: req.user._id })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email" },
      })
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Error fetching chats" });
  }
};


const createGroupChat = async (req, res) => {
  const { users, name } = req.body;

  if (!users || !name) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const parsedUsers = JSON.parse(users);
  if (parsedUsers.length < 2) {
    return res
      .status(400)
      .json({ message: "At least 2 users are required to form a group chat" });
  }

  parsedUsers.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: parsedUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(fullGroupChat);
  } catch (error) {
    console.error("Error creating group chat:", error);
    res.status(500).json({ message: "Failed to create group chat" });
  }
};


const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({ message: "chatId and userId are required" });
  }

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.json(updatedChat);
  } catch (error) {
    console.error("Error adding user to group:", error);
    res.status(500).json({ message: "Failed to add user to group" });
  }
};


const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;
  
    if (!chatId || !chatName) {
      return res.status(400).json({ message: "chatId and chatName are required" });
    }
  
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { chatName },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      if (!updatedChat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      res.json(updatedChat);
    } catch (error) {
      console.error("Error renaming group:", error);
      res.status(500).json({ message: "Failed to rename group" });
    }
  };
  const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
  
    if (!chatId || !userId) {
      return res.status(400).json({ message: "chatId and userId are required" });
    }
  
    try {
      const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { users: userId } },
        { new: true }
      )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      if (!updatedChat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      res.json(updatedChat);
    } catch (error) {
      console.error("Error removing user from group:", error);
      res.status(500).json({ message: "Failed to remove user from group" });
    }
  };
  
  export { 
    accessChat, 
    fetchChats, 
    createGroupChat, 
    addToGroup, 
    removeFromGroup, 
    renameGroup 
};
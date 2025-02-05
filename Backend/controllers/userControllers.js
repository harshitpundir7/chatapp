import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please Fill all the fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already Exist" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });


        const token = generateToken(newUser._id);


        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 
        });

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: token, 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: "Invalid email and password." });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid email and password" });
        }

        const token = generateToken(user._id);

        res.cookie('token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000 ,  
        }).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error at login" });
    }
};

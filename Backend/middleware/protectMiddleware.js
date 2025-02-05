import jwt from 'jsonwebtoken'
import User from '../model/userModel'

const protect = async(req,res)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            req.user = await User.findById(decode.id).select("-password")
            next();
        } catch (error) {
            console.log(error);
            res.status(401),json({message: "Not Authorized token failed"})
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect
import express from "express"
import protect from "../middleware/protectMiddleware.js";
import {registerUser, loginUser, me, allUsers, logoutUser} from "../controllers/userControllers.js"


const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser)
router.get("/",protect, allUsers);
router.post('/logout', logoutUser);
router.get("/me", protect, me)


export default router;
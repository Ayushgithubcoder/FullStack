import express from "express" 
import { registerUser,verifyUser} from "../Controllers/user.controllers.js"

const router=express.Router()

router.post("/register",registerUser)
router.get("/verify/:token",verifyUser)

export default router
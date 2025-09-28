import { Router } from "express";
import { getUserById, updateUserById } from "../services/user-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";
import User from "../models/User.js";

const profileController = Router()


profileController.get('/', isAuth,  async (req,res)=> {
const userId = req.user._id

try {
    const user = await getUserById(userId)
    res.json(user)
} catch (error) {
    res.status(400).json({message: "User not found !"})
}

})


profileController.patch('/', async (req, res) => {
    const userId = req.user._id
    const userInfo = {...req.body}

    try {
        const updatedUser = await updateUserById(userId, userInfo)
        res.json({ user: updatedUser, message: 'User updated successfully !'})
    } catch (error) {
        res.status(400).json({message: 'Failed to update user info !'})
    }
    

    

})


export default profileController
import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const register = async(email, username, password) => {
  const userCount = await User.countDocuments({ email });
  console.log(userCount)

    if (userCount > 0) {
      throw new Error('User already exists');
    }

    return User.create({ email, username, password });
};

export const login = async (email, password) => {
    const user = await User.findOne({ email })
    const JWT_SECRET = process.env.JWT_SECRET

    //Check if user exists
    if(!user){
      throw new Error('User does not exists !')
    }
    //Validate password with bcrypt
    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid){
      throw new Error('Password does not match !')
    }

    const payload = {
      _id: user._id,
      email
    }

    //Generate JWT Token
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'})

    return {
      _id: user.id,
      email: user.email,
      accessToken: token,
      isAuthenticated: true;
    }     
};



import { model, Schema, Types } from "mongoose";
import { SALT_ROUNDS } from "../constants.js";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Your password is too short !"]
    },
    profileImageUrl: {
        type: String,
        default: '' 
  },
    read: [{
        type: Types.ObjectId,
        ref: 'Books'
    }],
    currReading: [{
        type: Types.ObjectId,
        ref: 'Books'
    }],
    toRead: [{
        type: Types.ObjectId,
        ref: 'Books'
    }]
})

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS)

    this.password = hash
})

const User = model('User', userSchema)


export default User
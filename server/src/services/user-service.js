import User from "../models/User.js"

export const getUserById = async (userId) => {
    const user = await User.findById(userId)

    return user

}

export const updateUserById = async (userId, userInfo) => {
    const user = await User.findByIdAndUpdate(userId, userInfo, {new: true})

    return user
}

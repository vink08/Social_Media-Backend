import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    const { username, password, firstname, lastname } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
        username,
        password: hashedPass,
        firstname,
        lastname
    });
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json(error);
    }
};

export const loginUser = async (req, res) => {

    const {username,password} =req.body
    try { const user =await UserModel.findOne({username:username})
        !user && res.status(404).json("user not found")
        const validPassword = await bcrypt.compare(password,user.password)
        !validPassword && res.status(400).json("wrong password")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }



}

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ success: true, message: "User created successfully", user: { name: newUser.name, email: newUser.email }});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ success: true, message: "User logged in successfully", user: { name: user.name, email: user.email }, token });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getUserData = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }else{
            return res.status(200).json({ success: true, message: "User data fetched successfully", user });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { registerUser, loginUser, getUserData };
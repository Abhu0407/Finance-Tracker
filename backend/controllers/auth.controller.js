import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


// generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7h" });
}


// resister new User
export const signup = async (req, res) => {

    const { fullName, email, password } = req.body;

    try {
        // Validation: check for missing fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new User({
            fullName,
            email,
            password,
        });

        if (newUser) {
            const token = generateToken(newUser._id);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                token: token,
            });
        }
        else {
            return res.status(400).json({ message: "Failed to create new user" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login Usser
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }

        // check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // generate token
        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            user,
            token: token,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// get user Information
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getUserInfo controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

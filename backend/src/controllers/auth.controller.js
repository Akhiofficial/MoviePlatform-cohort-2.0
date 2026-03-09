const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


async function registerUser(req, res) {

    const { fullname, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({ email });

    if (isAlreadyRegistered) {
        return res.status(400).json({ message: "User already registered" })
    }

    const hashPassword = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        fullname,
        email,
        password: hashPassword
    })


    // token generation from jwt
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    // storing token in cookie
    res.cookie("token", token)


    // sending response to client
    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
    })
}


async function loginUser(req, res) {
    const { email, password } = req.body

    // finding user by email
    const user = await userModel.findOne({ email }).select("+password")


    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    // comparing password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    // token generation from jwt
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    // storing token in cookie
    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
    })
}

async function logoutUser(req, res) {
    const token = req.cookies.token

    if (!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    res.clearCookie("token")

    // save token into redis 
    // EX is for expire time in seconds 60 * 60 * 12 = 12 hours
    // await redis.set(token, Date.now().toString(), "EX", 60 * 60 * 12)

    res.status(200).json({
        message: "logout successfully"
    })
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role
        }
    })
}

async function updateProfile(req, res) {
    const { fullname, currentPassword, newPassword } = req.body;

    try {
        // Find user and explicitly select password if we need to check it
        const user = await userModel.findById(req.user.id).select('+password');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If they want to change the password, verify the current one
        if (currentPassword && newPassword) {
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid current password" });
            }

            // Hash new password
            user.password = await bcrypt.hash(newPassword, 10);
        }

        // Update fullname if provided
        if (fullname) {
            user.fullname = fullname;
        }

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    updateProfile
};

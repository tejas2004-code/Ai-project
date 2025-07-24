import { User } from "../Models/UserSchema.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const UserRegister = async (req, res) => {
    const { username,  email, password } = req.body;

    
    if (!username ||  !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
            success: false
        });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profilePic:'',
        });

        await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// User Login
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
            success: false
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: "Login successful",
            token,
            user,
            success: true
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// User Logout
export const Logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite:"lax",     
        secure: process.env.NODE_ENV === "production", 
          path: "/"
              
    });
    return res.status(204).json({
        message: "Logged out successfully",
        success: true
    });
};


export const googleLogin = async (req, res) => {
    const { name, email, avatar } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required for Google login",
            success: false
        });
    }

    try {
        let user = await User.findOne({ email });

       
        if (!user) {
            user = new User({
                username: name,
                email,
                profilePic: avatar,
             
            });
            await user.save();
        }

     
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, { 
            httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "Lax",
  
  secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user,
            success: true
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({
            message: 'Server error during Google login',
            success: false
        });
    }
};

export const AuthenticateUser=async (req, res) => {
    const token = req.cookies.token; 

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }
  

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        const user = await User.findById(decoded.id).select("-password");
        return res.status(200).json({
            message: 'User is Verified',
            token,
            user,
            success: true
        });
    });
};
export const githubLogin = async (req, res) => {
    const { name, email, avatar } = req.body;

    if (!email) {
        return res.status(400).json({
            message: "Email is required for GitHub login",
            success: false
        });
    }

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username: name,
                email,
                profilePic: avatar,
                
            });
            await user.save();
        }

       
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user,
            success: true
        });

    } catch (error) {
        console.error("GitHub Login Error:", error);
        return res.status(500).json({
            message: 'Server error during GitHub login',
            success: false
        });
    }
};

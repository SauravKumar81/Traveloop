"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const registerUser = async (req, res) => {
    const { email, password, displayName } = req.body;
    try {
        const userExists = await User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const user = await User_1.default.create({
            email,
            password,
            displayName,
        });
        if (user) {
            (0, generateToken_1.default)(res, user._id.toString());
            res.status(201).json({
                _id: user._id,
                email: user.email,
                displayName: user.displayName,
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            (0, generateToken_1.default)(res, user._id.toString());
            res.json({
                _id: user._id,
                email: user.email,
                displayName: user.displayName,
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};
exports.logoutUser = logoutUser;
const getMe = async (req, res) => {
    try {
        // req.user should be populated by the protect middleware
        const user = req.user;
        if (user) {
            res.status(200).json({
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.displayName,
                    avatar: user.avatar,
                    tier: user.subscriptionTier,
                }
            });
        }
        else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map
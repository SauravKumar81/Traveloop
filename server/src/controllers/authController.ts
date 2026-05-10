import { Request, Response } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, displayName } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({
      email,
      password,
      displayName,
    });

    if (user) {
      generateToken(res, user._id.toString());
      res.status(201).json({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await (user as any).matchPassword(password))) {
      generateToken(res, user._id.toString());
      res.json({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req: Request, res: Response): void => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user should be populated by the protect middleware
    const user = (req as any).user;
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
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

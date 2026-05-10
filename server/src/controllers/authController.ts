import { Request, Response } from 'express';
import crypto from 'crypto';
import { google } from 'googleapis';
import User from '../models/User';
import generateToken from '../utils/generateToken';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback'
);

const googleScopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

export const googleAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: googleScopes,
    });
    res.redirect(authUrl);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to start Google login' });
  }
};

export const googleAuthCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).json({ message: 'Google authorization code missing' });
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();

    const email = userInfo.data.email;
    const displayName = userInfo.data.name || '';
    const avatarUrl = userInfo.data.picture;

    if (!email) {
      res.status(400).json({ message: 'Google account email not available' });
      return;
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        displayName: displayName || email.split('@')[0],
        avatarUrl,
        password: crypto.randomBytes(32).toString('hex'),
      });
    }

    generateToken(res, user._id.toString());
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard`);
  } catch (error: any) {
    console.error('Google auth callback error:', error);
    res.status(500).json({ message: error.message || 'Google authentication failed' });
  }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, displayName, avatarUrl } = req.body;

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
      avatarUrl,
    });

    if (user) {
      generateToken(res, user._id.toString());
      res.status(201).json({
        _id: user._id,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
        tier: user.subscriptionTier,
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
        avatarUrl: user.avatarUrl,
        tier: user.subscriptionTier,
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
          avatar: user.avatarUrl,
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

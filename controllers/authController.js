const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResetEmail } = require('../utils/nodemailer');

// Register
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists or invalid data!' });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(401).json({ error: 'Invalid credentials!' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required!' });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        const resetToken = Math.random().toString(36).substr(2, 10);
        user.resetToken = resetToken;
        // user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendResetEmail(email, resetToken);
        res.status(200).json({ message: 'Password reset token sent to email!' });
    } catch (err) {
        console.error(err); // Log the exact error for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    }
};



// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({
            resetToken: token
        });
        if (!user) return res.status(400).json({ error: 'Invalid token!' });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = null; // Clear the reset token
        user.resetTokenExpiry = null; // Optional, since expiry is no longer needed
        await user.save();

        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (err) {
        console.error(err); // Log error for debugging
        res.status(500).json({ error: 'Something went wrong!' });
    }
};


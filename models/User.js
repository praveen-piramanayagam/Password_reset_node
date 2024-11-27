const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String }, // Field for storing the reset token
    resetTokenExpiry: { type: Date }, // Field for storing the token's expiry time
});

module.exports = mongoose.model('User', userSchema, 'users');

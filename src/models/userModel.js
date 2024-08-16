const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for a User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to hash the password before saving the user document
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to find a user by username or email
userSchema.statics.findByLogin = async function (login) {
    let user = await this.findOne({ username: login });
    if (!user) {
        user = await this.findOne({ email: login });
    }
    return user;
};

// Export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

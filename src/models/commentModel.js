const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the Comment model
const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

// Middleware to update the `updatedAt` field before saving
commentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to find comments by task
commentSchema.statics.findByTask = function(taskId) {
    return this.find({ task: taskId }).populate('author', 'username').exec();
};

// Export the Comment model
module.exports = mongoose.model('Comment', commentSchema);

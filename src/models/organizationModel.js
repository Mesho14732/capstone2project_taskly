const mongoose = require('mongoose');

// Define the schema for an organization
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  boards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically manages `createdAt` and `updatedAt`
});

// Pre-save middleware to update `updatedAt` on document update
organizationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Model creation
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;

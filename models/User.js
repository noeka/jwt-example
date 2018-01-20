let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Sets the updatedAt parameter equal to the current time
userSchema.pre('save', next => {
  now = new Date();
  if(!this.updatedAt) {
    this.updatedAt = now;
  }
  next();
});

module.exports = mongoose.model('user', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  midname: { type: String, required: false },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  fulladdress: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String },
  password: { type: String, required: true },
  profilePicture: { type: String },
  workRegion: { type: String, required: true },
  veoDetails: { type: String, required: true },
  weoDetails: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

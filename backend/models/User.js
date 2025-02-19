const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  midname: { type: String, required: false },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  regions: { type: String, required: true },
  district: { type: String, required: true },
  ward: { type: String, required: true },
  village: { type: String, required: true },
  street: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false }, // Will store Base64 or URL
  region: { type: String, required: true },
  position: { type: String, required: true },
  veoDetails: { type: String, required: true }, // Maps to "extraone"
  weoDetails: { type: String, required: true }, // Maps to "extratwo"
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }

      
  if (this.isModified('id')) {
    this.id = await bcrypt.hash(this.id, 12);
  }
  
  next();
});

module.exports = mongoose.model('User', userSchema);

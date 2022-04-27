const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  username: String,
  password: String,
  profileImage: String,
});

module.exports = mongoose.model('User', userSchema);

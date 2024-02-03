const mongoose = require('mongoose');

const shecma = mongoose.Schema

const userSchema = new shecma({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},{timestamps:true});
const user = mongoose.model('champions', userSchema);
module.exports = user;
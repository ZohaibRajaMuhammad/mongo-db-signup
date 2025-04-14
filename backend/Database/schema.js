// <<<<<<< Tabnine <<<<<<<
// /**//+
//  * Defines the User schema for MongoDB using Mongoose.//+
//  * The schema includes fields for user details and a pre-save hook to hash the password.//+
//  *//+
//  * @module schema//+
//  *///+
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// /**//+
//  * User schema definition.//+
//  *//+
//  * @typedef {Object} UserSchema//+
//  * @property {string} userName - The user's name.//+
//  * @property {string} fatherName - The user's father's name.//+
//  * @property {number} age - The user's age.//+
//  * @property {string} email - The user's email. Must be unique.//+
//  * @property {string} password - The user's password.//+
//  * @property {number} phoneNumber - The user's phone number.//+
//  * @property {string} gender - The user's gender.//+
//  *///+
// const userSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   fatherName: { type: String, required: true },
//   age: { type: Number, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phoneNumber: { type: Number , required: true },//-
//   phoneNumber: { type: Number, required: true },//+
//   gender: { type: String, required: true }
// });

// // Hash password before saving//-
// /**//+
//  * Pre-save hook to hash the password before saving the user document.//+
//  *//+
//  * @function//+
//  * @name userSchema.pre//+
//  * @param {string} 'save' - The Mongoose event name.//+
//  * @param {function} async - The asynchronous function to hash the password.//+
//  * @param {function} next - The callback function to continue with the save operation.//+
//  *///+
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// /**//+
//  * Exports the User model based on the defined schema.//+
//  *//+
//  * @type {mongoose.Model<mongoose.Document, mongoose.Model<any, any>>}//+
//  *///+
// module.exports = mongoose.model('User', userSchema);
// >>>>>>> Tabnine >>>>>>>// {"conversationId":"58df7d0a-22cf-4b4f-b18b-f3778a3e44e8","source":"instruct"}

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: [true, 'Username is required'],
    trim: true,
    minlength: [2, 'Username must be at least 2 characters']
  },
  fatherName: { 
    type: String, 
    required: [true, "Father's name is required"],
    trim: true
  },
  age: { 
    type: Number, 
    required: [true, 'Age is required'],
    min: [12, 'Minimum age is 12 years'],
    max: [120, 'Maximum age is 120 years']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: [true, 'Email already registered'],
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Invalid phone number format'],
    trim: true
  },
  gender: { 
    type: String, 
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female', 'other', 'prefer-not-to-say'],
      message: 'Invalid gender selection'
    }
  }
});

// Enhanced password hashing with error handling
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(new Error('Password hashing failed: ' + err.message));
  }
});

module.exports = mongoose.model('User', userSchema);
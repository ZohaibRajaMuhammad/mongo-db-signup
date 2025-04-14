const User = require('../Database/schema');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
  try {
    const { userName, fatherName, age, email, password, phoneNumber, gender } = req.body;
    
    const newUser = new User({
      userName,
      fatherName,
      age,
      email,
      password,
      phoneNumber,
      gender
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
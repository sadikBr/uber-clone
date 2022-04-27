const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  const emailAvailable = (await User.find({ email })).length === 0;

  if (emailAvailable) {
    let passwordsError = false;
    if (password !== confirmPassword) {
      passwordsError = true;
    }

    if (passwordsError) {
      res.status(400);
      res.json({
        message: 'Passwords does not match!',
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        profileImage:
          'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
      });
      await user.save();

      const token = jwt.sign(user.id, process.env.PRIVATE_KEY);

      res.json({
        token,
      });
    }
  } else {
    res.status(400);
    res.json({
      message: 'Email already in use.',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(user.id, process.env.PRIVATE_KEY);

      res.json({
        token,
      });
    } else {
      res.status(400);
      res.json({
        message: 'Invalid Password.',
      });
    }
  } else {
    res.status(400);
    res.json({
      message: 'Email provided not found!',
    });
  }
});

module.exports = router;

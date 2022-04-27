const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const { User } = require('../models');

router.get('/', async (req, res) => {
  const { authorisation } = req.headers;
  const token = authorisation.split(' ')[1];

  const id = jwt.decode(token);
  const { username, firstName, lastName, email, profileImage } =
    await User.findOne({ _id: id });

  res.json({
    user: {
      username,
      firstName,
      lastName,
      email,
      profileImage,
    },
  });
});

module.exports = router;

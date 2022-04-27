const express = require('express');
const router = express.Router();

router.post('/google', (req, res) => {
  res.json({
    message: 'this is google oauth endpoint',
  });
});

router.post('/facebook', (req, res) => {
  res.json({
    message: 'this is facebook oauth endpoint',
  });
});

module.exports = router;

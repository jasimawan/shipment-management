const express = require('express');

const User = require('../models/Users');

const router = express.Router();

router.get("", (req,res,next) => {
  User.find()
    .then(documents => {
      res.status(200).json({
        message: 'Users fetched successfully!',
        users: documents
      });
    });
});

module.exports = router;

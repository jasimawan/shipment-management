const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post("/signup", (req,res,next)=> {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        name: req.body.name,
        type: req.body.type,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
    });
});

router.post("/login", (req,res,next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      const token = jwt.sign(
        {email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        {expiresIn: "1h"}
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser.id,
        userType: fetchedUser.type,
        userName: fetchedUser.name
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    });
});

router.get("", (req,res,next) => {
  User.find({type: 'worker'})
    .then(documents => {
      res.status(200).json({
        message: 'Workers fetched successfully!',
        users: documents
      });
    });
});

router.delete("/:id",  (req, res, next) => {
  User.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Worker Deleted!"});
    })
    .catch(err => {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    });
});

module.exports = router;

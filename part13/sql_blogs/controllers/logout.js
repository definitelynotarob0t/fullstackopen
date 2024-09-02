const express = require('express');
const router = express.Router();
const sessionValidator = require('./sessionvalidator')
const Session = require('../models/session'); 

router.delete('/', sessionValidator, async (req, res, next) => {
  try {
    const token = req.get('authorization').substring(7);

    await Session.destroy({
      where: {
        userId: req.user.id,
        token: token
      }
    });

    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

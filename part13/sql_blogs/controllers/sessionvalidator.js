const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');


const sessionValidator = async (req, res, next) => {
  const authorization = req.get('authorization');
  let token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }

  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET);

    const session = await Session.findOne({
      where: {
        userId: decodedToken.id,
        token: token,
      }
    });

    if (!session) {
      return res.status(401).json({ error: 'session invalid' });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' });
  }
};

module.exports = sessionValidator;

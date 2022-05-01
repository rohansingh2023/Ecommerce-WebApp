const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authheader = req.headers.token;
  if (authheader) {
    const token = authheader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is invalid!!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!!");
  }
};

const verifyandAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized!!");
    }
  });
};

const verifyandAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not authorized!!");
    }
  });
};

module.exports = { verifyToken, verifyandAuthorize, verifyandAdmin };

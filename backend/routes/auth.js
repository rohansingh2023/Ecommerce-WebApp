const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//REGISTER
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong Credentials!!");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const Ogpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    Ogpassword !== req.body.password &&
      res.status(401).json("Wrong Credentials!!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    // const { password, ...other } = user._doc;

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// Register
// router.post("/register", async (req, res, next) => {
//   const { username, email, password } = req.body;

//   try {
//     let user_exist = await User.findOne({ email: email });

//     if (user_exist) {
//       return res.status(400).json({
//         success: false,
//         msg: "User already exists",
//       });
//     }

//     let user = new User();

//     user.username = username;
//     user.email = email;

//     const salt = await bcryptjs.genSalt(10);
//     user.password = await bcryptjs.hash(password, salt);

//     // let size = 200;
//     // user.avatar = "https://gravatar.com/avatar/?s=" + size + "&d=retro";

//     await user.save();

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.jwtUserSecret,
//       {
//         expiresIn: 360000,
//       },
//       (err, token) => {
//         if (err) throw err;

//         res.status(200).json({
//           success: true,
//           msg: "User Registered successfully",
//           token: token,
//           user: user,
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//     res.status(402).json({
//       success: false,
//       message: "Something error occured",
//     });
//   }
// });

// // Login
// router.post("/login", async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     let user = await User.findOne({
//       email: email,
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         msg: "User does not exists go & register to continue.",
//       });
//     }

//     const isMatch = await bcryptjs.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         msg: "Invalid password",
//       });
//     }

//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.jwtUserSecret,
//       {
//         expiresIn: 360000,
//       },
//       (err, token) => {
//         if (err) throw err;

//         res.status(200).json({
//           success: true,
//           msg: "User logged in",
//           token: token,
//           user: user,
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       success: false,
//       msg: "Server Error",
//     });
//   }
// });

module.exports = router;

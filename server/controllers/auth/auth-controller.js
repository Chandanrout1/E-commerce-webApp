const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//signup
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already Exists with this email.",
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "SignUp Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first.",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Incorrect Password! Please try again.",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username : checkUser.username
      },
      "SECRET_KEY",
      { expiresIn: "240m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username : checkUser.username
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware

const authMiddleware = async(req, res, next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success : false,
    message : "Unauthorised user!"
  })

  try {
    const decoded = jwt.verify(token, "SECRET_KEY" )
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).status(401).json({
      success : false,
      message : "Unauthorised user!"
    })
  }
} 

module.exports = { signupUser, loginUser, logoutUser, authMiddleware };

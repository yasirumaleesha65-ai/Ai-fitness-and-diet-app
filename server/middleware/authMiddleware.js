const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuthVerification = async (req, res, next) => {
  // console.log("Cookies received:", req.cookies.token); 

  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Ether token has expired or user has not authenticated",
    });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userInfo = await User.findById(decoded.userId);

      if (!userInfo) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      req.user = userInfo;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Token did not verify",
      });
    }
  }
};

module.exports = { userAuthVerification };

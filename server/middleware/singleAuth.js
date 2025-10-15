const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuthVerification1 = async (req, res, next) => {
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

      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Token did not verify",
      });
    }
  }
};
module.exports = { userAuthVerification1 };

const jwt = require("jsonwebtoken");
const { variable } = require("../../config/variables");
const errorResponseHandler = require("./errorResponseHandler");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw {
        status: 401,
        message: "Unauthorized access",
      };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw {
        status: 401,
        message: "Unauthorized access",
      };
    }

    const userData = jwt.verify(token, variable.jwtSecret);
    if (!userData.id) {
      throw {
        status: 401,
        message: "Unauthorized access",
      };
    }

    req.headers.id = userData.id;
    req.headers.role = userData.role;
    req.headers.email = userData.email;
    req.headers.mobile = userData.mobile;
    req.headers.role = userData.role;

    await next();
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

module.exports = authenticate;

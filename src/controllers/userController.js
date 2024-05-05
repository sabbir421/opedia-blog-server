const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { hashPasswordFunc } = require("../helper/lib/hashPassword");

const { uuid } = require("uuidv4");
const { validate } = require("../validation/validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { variable } = require("../config/variables");
const {
  getUserByEmail,
  userSignup,
  getUserById,
} = require("../models/userModel");
const { createUserRules } = require("../validation/validationRules");

exports.userSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password: originalpassword,
      confirmPssword,
      role,
      mobile,
    } = req.body;
    validate(
      {
        firstName,
        lastName,
        userName,
        email,
        originalpassword,
        role,
        mobile,
      },
      createUserRules
    );

    const user = await getUserByEmail(email);
    if (user) {
      return res.response.success(null, "User already exists", {});
    }
    if (originalpassword !== confirmPssword) {
      return res.response.fail(null, "password not match", {});
    }
    const userId = uuid();
    const password = await hashPasswordFunc(originalpassword);
    const data = {
      userId,
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      mobile,
    };
    const response = await userSignup(data);
    const token = jwt.sign(
      {
        id: response._id,
        signatureId: response.sellerId,
        firstname: response.firstName,
        lastName: response.lastName,
        userName: response.userName,
        email: response.email,
        mobile: response.mobile,
        role: response.role,
        status: response.status,
      },
      variable.jwtSecret,
      { expiresIn: "2160h" }
    );

    res.response.success(token, "User Create successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password: givenPassword } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.response.fail(null, " Invalid email, password");
    }
    const match = await bcrypt.compare(givenPassword, user.password);
    if (!match) {
      return res.response.fail(null, " Invalid email, password");
    }
    const token = jwt.sign(
      {
        id: user._id,
        signatureId: user.sellerId,
        firstname: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        status: user.status,
      },
      variable.jwtSecret,
      { expiresIn: "2160h" }
    );
    return res.response.success({token,user}, "User login successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.response.fail(null, "User not found");
    }
    return res.response.success(user, "User fetched successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

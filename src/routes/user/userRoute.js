const express = require("express");

const authenticate = require("../../helper/lib/authenticate");
const {
  userSignup,
  userLogin,
  getUserById,
} = require("../../controllers/userController");
const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.get("/details/:id", authenticate, getUserById);

module.exports = router;

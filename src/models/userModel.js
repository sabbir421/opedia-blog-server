const User = require("../schema/userSchema");


exports.getUserByEmail = async (email) => {
  const response = await User.findOne({ email });
  return response;
};

exports.userSignup = async (data) => {
  const user = new User(data);
  return user.save();
};


exports.getUserById = async (id) => User.findOne({ _id: id });


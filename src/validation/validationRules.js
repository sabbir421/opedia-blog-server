const createUserRules = {
  firstName: "required|string",
  lastName: "required|string",
  userName: "required|string",
  email: "required|string|email",
  mobile: "required|string",
  originalpassword: "required|string",
  role: "required|string|in:user",
};

module.exports = {
  createUserRules,
};

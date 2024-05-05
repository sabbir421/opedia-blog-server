const express = require("express");
const healthRoute = require("./health/healthRoute");
const router = express.Router();

const userRoute = require("./user/userRoute");
const blogRoute=require("./blog/blogRoute")
const defaultRoutes = [
  {
    path: "/check",
    route: healthRoute, 
  },

  {
    path: "/auth/user",
    route: userRoute,
  },
  {
    path: "/blog",
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

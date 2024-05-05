const express = require("express");
const multer = require("multer");
const authenticate = require("../../helper/lib/authenticate");
const {
  createBlog,
  getAllBlog,
  updateBlog,
  deleteBlog,
  blogComment,
  getBlogComment,
} = require("../../controllers/blogController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post(
  "/create",
  upload.fields([{ name: "blogImage", maxCount: 1 }]),
  createBlog
);
router.get("/get", getAllBlog);
router.patch(
  "/update/:blogId",
  upload.fields([{ name: "blogImage", maxCount: 1 }]),
  updateBlog
);
router.delete("/delete/:blogId", deleteBlog);
router.post("/comment", blogComment);
router.get("/comment/:blogId", getBlogComment);
module.exports = router;

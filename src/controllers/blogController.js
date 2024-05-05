const { variable } = require("../config/variables");
const errorResponseHandler = require("../helper/lib/errorResponseHandler");
const { genarateFilename } = require("../helper/lib/generateFilename");
const { uploadFile } = require("../helper/lib/uploadFileS3");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createComment,
  getBlogComment,
} = require("../models/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, blog, ownerName, ownerId } = req.body;
    const { blogImage } = req.files;
    const blogImageBuffer = blogImage[0]?.buffer;
    const blogImageMimeType = blogImage[0]?.mimetype;
    const blogImageName = await genarateFilename(blogImage[0]?.originalname);
    await uploadFile(
      blogImageBuffer,
      `blogImage/${blogImageName}`,
      blogImageMimeType
    );
    const blogImageUrl = `https://${variable.s3Configs.s3BucketName}.s3.amazonaws.com/blogImage/${blogImageName}`;
    const data = {
      title,
      blog,
      ownerName,
      ownerId,
      blogImage: blogImageUrl,
      blogId: 1,
    };
    const response = await createBlog(data);
    return res.response.success(response, "Blog create success");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    if (blogs.length < 1) {
      return res.response.success([], "Blog list is empty", {});
    }
    return res.response.success(blogs, "Blog list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, blog, ownerName, ownerId } = req.body;

    const { blogImage } = req.files;
    let blogImageBuffer = null;
    let blogImageMimeType = null;
    if (blogImage) {
      blogImageBuffer = await sharp(blogImage[0]?.buffer)
        .resize(320, 240)
        .toBuffer();

      blogImageMimeType = blogImage[0]?.mimetype;
    }

    let blogImageName = "";
    if (blogImage) {
      blogImageName = await genarateFilename(blogImage[0]?.originalname);
    }
    const blogData = await getBlogById(blogId);
    if (!blogData) {
      return res.response.success(null, "Blog not found", {});
    }
    let blogImageUrl = "";

    if (blogImage) {
      await uploadFile(
        blogImageBuffer,
        `blogImage/${blogImageName}`,
        blogImageMimeType
      );
      blogImageUrl = `https://${variable.s3Configs.s3BucketName}.s3.amazonaws.com/blogImage/${blogImageName}`;
    }

    const data = {
      title: title || blogData.title,
      blog: blog || blogData.blog,
      ownerName: ownerName || blogData.ownerName,
      ownerId: ownerId || blogData.ownerId,
      blogImage: blogImageUrl || blog.blogImage,
    };

    const response = await updateBlog(blogId, data);
    return res.response.success(response, "Blog update successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await getBlogById(blogId);
    if (!blog) {
      return res.response.success(null, "Blog not found", {});
    }
    await deleteBlog(blogId);
    return res.response.success({}, "Blog delete successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

exports.blogComment = async (req, res) => {
  try {
    const { comment, commentByName, commentById, blogId } = req.body;
    const data = {
      comment,
      commentByName,
      commentById,
      blogId,
    };
    const response = await createComment(data);
    return res.response.success(response, "Comment create successfully");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};
exports.getBlogComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await getBlogComment(blogId);
    if (comments.length < 1) {
      return res.response.success([], "Comment not found", {});
    }
    return res.response.success(comments, "Comment list");
  } catch (error) {
    errorResponseHandler(res, error);
  }
};

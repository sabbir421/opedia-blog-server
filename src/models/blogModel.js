const Blog = require("../schema/blogSchema");
const Comment = require("../schema/commentSchema");

exports.createBlog = async (data) => {
  const blog = new Blog(data);
  return blog.save();
};
exports.getAllBlogs = async () => Blog.find();
exports.getBlogById = async (blogId) => {
  const response = await Blog.findOne({ _id: blogId });
  return response;
};
exports.updateBlog = async (blogId, data) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $set: data },
    { new: true }
  );
  return updatedBlog;
};

exports.deleteBlog = async (blogId) => Blog.deleteOne({ _id: blogId });

exports.createComment = async (data) => {
  const comment = new Comment(data);
  return comment.save();
};

exports.getBlogComment = async (blogId) => {
  const comments = await Comment.find({ blogId: blogId });
  return comments;
};

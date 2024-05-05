const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
   
    comment: {
      type: String,
      required: true,
    },
    commentByName: {
      type: String,
      Required: true,
    },
    commentById: {
      type: String,
      Required: true,
    },
    
      blogId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      blog: {
        type: String,
        Required: true,
      },
      blogImage: {
        type: String,
        Required: true,
      },
      owner: {
        type: String,
        Required: true,
      },
      ownerId: {
        type: String,
        Required: true,
      },
  },
  {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'updatedOn',
    },
  },
);
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;

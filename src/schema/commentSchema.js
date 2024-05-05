const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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
  },
  {
    timestamps: {
      createdAt: "createdOn",
      updatedAt: "updatedOn",
    },
  }
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

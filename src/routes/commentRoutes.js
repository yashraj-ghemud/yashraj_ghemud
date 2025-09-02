//src/routes/commentRoutes
const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

/** 
 * Add a comment to a post
 * POST /api/comments/:postId
 */
router.post("/:postId", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "❌ Post not found" });

    const comment = { user: req.user.id, text }; // logged-in user
    post.comments.push(comment);
    await post.save();

    const populatedPost = await post.populate("comments.user", "name email");

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "❌ Failed to add comment" });
  }
});

/**
 * Get all comments for a post
 * GET /api/comments/:postId
 */
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "comments.user",
      "name email"
    );
    if (!post) return res.status(404).json({ message: "❌ Post not found" });

    res.json(post.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "❌ Failed to fetch comments" });
  }
});

/**
 * Update a comment
 * PUT /api/comments/:postId/:commentId
 */
router.put("/:postId/:commentId", auth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "❌ Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "❌ Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "❌ Not authorized" });

    comment.text = text;
    await post.save();

    const populatedPost = await post.populate("comments.user", "name email");
    res.json(populatedPost);
  } catch (err) {
    console.error("Error updating comment:", err);
    res.status(500).json({ message: "❌ Failed to update comment" });
  }
});

/**
 * Delete a comment
 * DELETE /api/comments/:postId/:commentId
 */
router.delete("/:postId/:commentId", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "❌ Post not found" });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "❌ Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "❌ Not authorized" });

    comment.deleteOne();
    await post.save();

    res.json({ message: "✅ Comment deleted" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "❌ Failed to delete comment" });
  }
});

module.exports = router;

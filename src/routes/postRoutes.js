const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");
const router = express.Router();



//admin delte post


router.delete("/:postId", auth, async (req, res) => {
  // 1. Fetch full user so we know if they’re admin
  const User = require("../models/User");
  const actingUser = await User.findById(req.user.id);

  // 2. Enforce admin
  if (!actingUser.isAdmin) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  // 3. Delete the post
  const deleted = await Post.findByIdAndDelete(req.params.postId);
  if (!deleted) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json({ message: "Post deleted" });
});


// Create Post
router.post("/", auth, async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim())
    return res.status(400).json({ message: "Content is required" });

  const post = await Post.create({
    user: req.user.id,
    content,
  });
  await post.populate("user", "name email");
  res.status(201).json(post);
});

// Get Posts
router.get("/", async (_req, res) => {
  const posts = await Post.find()
    .populate("user", "name email")
    .populate("comments.user", "name email")
    .sort({ createdAt: -1 });
  res.json(posts);
});

// Add Comment
router.post("/:postId/comment", auth, async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim())
    return res.status(400).json({ message: "Comment text is required" });

  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push({ user: req.user.id, text });
  await post.save();

  const updated = await Post.findById(req.params.postId)
    .populate("user", "name email")
    .populate("comments.user", "name email");

  res.status(201).json(updated);
});

module.exports = router;
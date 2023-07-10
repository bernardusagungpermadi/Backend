import Post from '../models/PostModel.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { title, body, categoryId, userId, link, thumbnailUrl } = req.body;

  try {
    const post = await Post.create({
      title,
      body,
      thumbnail: thumbnailUrl,
      link,
      categoryId,
      userId,
      likes: 0,
      views: 0
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create post' });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, body, categoryId, userId, link } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await post.update({ title, body, categoryId, userId, link });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update post' });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await post.destroy();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete post' });
  }
};

// Increment the like count of a post by 1
export const likePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.likes += 1;
    await post.save();
    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like post' });
  }
};

// Increment the view count of a post by 1
export const viewPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.views += 1;
    await post.save();
    res.json({ message: 'Post viewed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to view post' });
  }
};

// Decrement the like count of a post by 1
export const unlikePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    if (post.likes > 0) {
      post.likes -= 1;
      await post.save();
    }
    res.json({ message: 'Post unliked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unlike post' });
  }
};

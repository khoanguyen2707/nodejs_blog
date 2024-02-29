const router = require('express').Router();
const dataSource = require('../config/database.js');
const Task = require('../models/postEntity.js')
const postRepository = dataSource.getRepository(Task);

router.route('/post')
  //Get all posts
  .get(async (req, res) => {
    try {
      const posts = await postRepository.find();
      if (!posts || posts.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No posts found',
        });
      }
      res.status(200).json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Create Post
  .post(async (req, res) => {
    try {
      const { title, body } = req.body;

      if (!title || !body) {
        return res.status(400).json({
          status: 'error',
          message: 'Title and content are required',
        });
      }

      const doc = postRepository.create({ title, body });
      const post = await postRepository.save(doc);

      res.status(201).json({
        status: 'success',
        post,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });


router.route('/post/:id')
  //Update A Single Sost
  .patch(async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;

      if (!title && !content) {
        return res.status(400).json({
          status: 'error',
          message: 'Title or content is required for update',
        });
      }

      const post = await postRepository.findOneAndUpdate({ id: postId }, req.body, { new: true });

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      res.status(200).json({
        status: 'success',
        post,
      });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Get Back A Single Post
  .get(async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postRepository.findOne({ id: postId });
      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }
      res.status(200).json({
        status: 'success',
        post,
      });

    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  })

  //Delete Single Post
  .delete(async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await postRepository.findOneAndDelete({ id: postId });

      if (!post) {
        return res.status(404).json({
          status: 'error',
          message: 'Post not found',
        });
      }

      res.status(200).json({
        status: 'success',
        post,
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  });

module.exports = router;

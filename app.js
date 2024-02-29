const express = require('express');
const app = express();
const dataSource = require('./config/db.js');
const Task = require('./models/postEntity.js')
const postRepository = dataSource.getRepository(Task);

app.use(express.json());

//Get All Posts
app.get('/post', async (req, res) => {
  const posts = await postRepository.find();

  res.status(200).json({
    status: 'success',
    posts,
  });
});

//Create Post
app.post('/post', async (req, res) => {
  const doc = postRepository.create(req.body);

  const post = await postRepository.save(doc);

  res.status(200).json({
    status: 'success',
    post,
  });
});

//Update A Single Sost
app.patch('/post/:id', async (req, res) => {
  const post = await postRepository.update({ id: req.params.id }, req.body);

  res.status(200).json({
    status: 'success',
    post,
  });
});

//Get Back A Single Post
app.get('/post/:id', async (req, res) => {
  const post = await postRepository.findBy({ id: req.params.id });

  res.status(200).json({
    status: 'success',
    post,
  });
});

//Delete Single Post
app.delete('/post/:id', async (req, res) => {
  const post = await postRepository.delete({ id: req.params.id });

  res.status(200).json({
    status: 'success',
    post,
  });
});    

module.exports = app;

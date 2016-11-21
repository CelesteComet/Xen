var post = require('../controller/post.server.controller');

module.exports = function(app){

  // getting all posts
  app.get('/posts', post.all);

  // creating a new post
  app.post('/posts', post.create);

  // will use :post param as id and find a post object and attach it as req.post as middleware
  app.param('post', post.findPostById);

  // getting an individual post
  app.get('/posts/:post', post.read);

  // upvoting a post
  app.put('/posts/:post/upvote', post.upvotePost);

  // create a new comment for a post
  app.post('/posts/:post/comments', post.addComment);

  // will use :comment param as id and find a comment object and attach it as req.comment as middleware
  app.param('comment', post.findCommentById);

  // upvoting a comment
  app.put('/posts/:post/comments/:comment/upvote', post.upvoteComment);

};
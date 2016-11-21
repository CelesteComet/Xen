var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

exports.all = function(req, res, next){
  Post.find(function(err, posts){
    if(err){ return next(err); };

    res.json(posts);
  });
};

exports.findPostById = function(req, res, next, id){
  Post.findOne({_id: id}, function(err, post){
    if(err){ return next(err); };
    if(!post){ return next(new Error('can\'t find post')); };

    req.post = post;
    next();
  });
};

exports.findCommentById = function(req, res, next, id){
  Comment.findOne({_id: id}, function(err, comment){
    if(err){ return next(err); };
    if(!comment){ return next(new Error('can\'t find comment')); };

    req.comment = comment;
    next();
  });
}

exports.create = function(req, res, next){
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); };

    res.json(post);
  });
};

exports.read = function(req, res, next){
  req.post.populate('comments', function(err, post){
    if(err){ return next(err); };
    res.json(post);
  });
};

exports.upvotePost = function(req, res, next){
  req.post.upvote(function(err, post){
    if(err){ return next(err); };
    res.json(post);  
  }); // from the model instance methods
}

exports.upvoteComment = function(req, res, next){
  req.comment.upvote(function(err, comment){
    if(err){ return next(err); };
    res.json(comment);
  });
}

exports.addComment = function(req, res, next){
  // initialize the comment

  var comment = new Comment(req.body);
  
  // the post of the comment
  comment.post = req.post;

  // save the comment
  comment.save(function(err, comment){
    if(err){ return next(err); };
    
    // add the comment to the post
    req.post.comments.push(comment);

    // save the post
    req.post.save(function(err, post){
      if(err){ return next(err); };
    });

    res.json(comment);
  });
};




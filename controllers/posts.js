const Post = require('../models/post');

module.exports = (app) => {
  // GET INDEX PAGE
  app.get('/', (req, res) => {
    Post.find({}).lean()
      .then(posts => {
        console.log('blablablabla')
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err.message);
      });
  })
  // GET NEW POST PAGE
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  });

  // CREATE: POST something ON NEW POST PAGE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  // GET SHOW SINGLE POST
  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

};

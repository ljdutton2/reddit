const express = require('express')
const app = express()
const port = 3000

// require handlebars
const exphbs = require('express-handlebars');


require('./controllers/posts.js')(app);
// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');

// NEW
app.get('/posts/new', (req, res) => {
  res.render('posts-new', { posts: posts});
})

app.listen(port, () => console.log(` app listening at http://localhost:${port}`))
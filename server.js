const express = require('express')
const app = express()
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cookieParser()); // Add this after you initialize express.

// require handlebars
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');
// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


// Use "main" as our default layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Use handlebars to render
app.set('view engine', 'handlebars');


require('dotenv').config();
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);


// NEW
// app.get('/posts/new', (req, res) => res.render('posts-new'))

const port = 3000

app.listen(port, () => console.log(` app listening at http://localhost:${port}`))

module.exports = app;
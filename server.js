const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

//body-parser config
app.use(express.urlencoded());
app.use(express.json());

//Passport config
app.use(passport.initialize());
require('./config/passport')(passport);



//db connect
const db = keys.mongoURI;
mongoose.connect(db)
        .then(() => console.log("Mongo DB connected!"))
        .catch(err => console.log(err))


//First Route
app.get('/', (req, res) => (res.send('Hello World! My First Route...')));

const port = 5500;
app.listen(port, () => console.log(`Server running on Port ${port}!`));

//Use Route
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts',posts);
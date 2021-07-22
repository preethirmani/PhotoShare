const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
const app = express();


//db connect
const db = keys.mongoURI;
mongoose.connect(db)
        .then(() => console.log("Mongo DB connected!"))
        .catch(err => console.log(err))


//First Route
app.get('/', (req, res) => (res.send('Hello World! My First Route...')));
const port = 5500;
app.listen(port, () => console.log(`Server running on Port ${port}!`));
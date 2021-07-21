const express = require('express');
const app = express();


//First Route
app.get('/', (req, res) => (res.send('Hello World! My First Route...')));
const port = 5500;
app.listen(port, () => console.log(`Server running on Port ${port}!`));
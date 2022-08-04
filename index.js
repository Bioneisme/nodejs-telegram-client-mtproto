const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs')

const start = () => {
    app.listen(PORT, () => console.log("http://localhost:" + PORT));
}

app.use(authRoutes);

start()
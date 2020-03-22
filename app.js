'use strict';
const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const router = require('./routes/index.router')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000;

require("dotenv").config();
require("./views/helpers");

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use("/", express.static(path.join(__dirname, "/public")))
    .set('view engine', 'hbs')
    .engine('hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
        partialsDir: path.join(__dirname, 'views/partials')
    }))
    .use('/', router)
    .listen(port, () => console.log(`Listening on port ${port}!`))
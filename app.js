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
    .use((err, req, res, next) => {
        res.locals.error = err;
        const status = err.status || 500;
        res.status(status);
        res.render('error', {
            message: "We can't find this session!"
        });
    })
    .listen(port, () => console.log(`Listening on port ${port}!`))
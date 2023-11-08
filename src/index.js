'use strict';

const dotenv = require('dotenv');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routes = require('./routes');

var app = express();

if(!process.env.NODE_ENV)
  dotenv.config({ path: './env/.env' });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

Object.values(routes).forEach(router => app.use(router));

module.exports = app;

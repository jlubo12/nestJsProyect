'use strict';

var express = require('express');
var router = express.Router();

const prueba = require('./../../controllers/prueba')

router.route('/')
    .get(prueba)

module.exports = router;

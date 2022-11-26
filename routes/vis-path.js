const visPathController =require('../controllers/vis-path');
const express = require('express');

var router = express.Router();

router.get("/get-path", visPathController.getPath);

module.exports = router; 
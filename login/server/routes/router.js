const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.post('/users/signUp', controllers.signUp);

router.post('/users/login', controllers.login);



module.exports = router;
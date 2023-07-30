const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.post('/users/add-user', controllers.addUser);



module.exports = router;
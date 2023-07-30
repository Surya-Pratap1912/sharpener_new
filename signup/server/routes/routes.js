
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.post('/push-data', controller.postPushData);

router.get('/get-data', controller.getGetData);

router.delete('/products/:id', controller.deleteData);

router.put('/products/:id', controller.updateData);

module.exports = router;
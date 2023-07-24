
const express = require('express');
const controller = require('../2.controllers/controller');
const router = express.Router();

router.post('/push-data', controller.postPushData);

router.get('/get-data', controller.getGetData);

router.post('/delete-data/:prodId', controller.deleteData);

router.post('/update-data/:prodId', controller.updateData);

module.exports = router;
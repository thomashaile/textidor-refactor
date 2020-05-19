// require the handlers
//const handler = require('handlers');
//_;
const handlers = require('./handlers');
const express = require('express');
const path = require('path');
const router = express.Router();

// add routes to router
router.get('/', handlers.home);
router.get('/files', handlers.listFiles);
router.get('/files/:name', handlers.fetchAndLoadFile);
router.post('/files/:name', handlers.saveFile);
router.delete('/files/:name', handlers.deleteFile);

// export the router
module.exports = router;
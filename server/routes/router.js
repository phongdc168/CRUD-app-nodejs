const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.home);

route.get('/add-account', services.addAccount);

route.get('/update-account', services.updateAccount); 

// API
route.post('/api/accounts', controller.create);
route.get('/api/accounts', controller.find);
route.put('/api/accounts/:id', controller.update);
route.delete('/api/accounts/:id', controller.delete);

module.exports = route;
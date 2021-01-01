// /api/v1/user

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');


router.get('/', controllers.getAll);
router.get('/:username', controllers.getOne);
router.post('/', controllers.create);
router.put('/', controllers.update)
router.delete('/:username', controllers.destroy);


module.exports =  router;
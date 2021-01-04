// /api/v1/user

const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');
const {validateSignupRequest,isRequestValidated}=require('../validator/user')


router.get('/', controllers.getAll);
router.get('/:username', controllers.getOne);
router.post('/',validateSignupRequest,isRequestValidated, controllers.create);
router.put('/', controllers.update)
router.delete('/:username', controllers.destroy);


module.exports =  router;
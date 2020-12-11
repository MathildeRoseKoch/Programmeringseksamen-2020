var express = require('express');
var router = express.Router();

// henter controller modules.
var user_controller = require('../controllers/userController');
var login_controller = require('../controllers/loginController');
var matches_controller = require('../controllers/matchesController');


//frontend 
router.get('/', login_controller.startpoint_get);

router.post('/login', login_controller.login_post);

router.get('/logout', login_controller.logout);


//User register
router.get('/register', user_controller.user_create_get);

router.post('/register', user_controller.user_create_post);


// CRUD endpintsne opstilles alle nedenfor, med brug af get og post 
router.get('/user', user_controller.user_detail);

router.get('/user/update', user_controller.user_create_get);

router.post('/user/update', user_controller.user_create_post);

router.get('/user/:id/delete', user_controller.user_delete_get);

router.post('/user/:id/delete', user_controller.user_delete_post);

router.get('/user/:id/update', user_controller.user_update_get);

router.post('/user/:id/update', user_controller.user_update_post);

router.get('/user/:id', user_controller.user_detail);

router.get('/users', user_controller.user_list);

router.post('/user/:id/updatepassword/', user_controller.user_update_password_get);



// Matches endpoints 
router.get('/matches/get-more', matches_controller.possible_match);

router.post('/matches/:id/:name', matches_controller.newprofile);

router.get('/matches', matches_controller.show_matches);

module.exports = router;

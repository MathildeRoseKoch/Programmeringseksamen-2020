//Routing refers to how an application’s endpoints (URIs) respond to client requests. For an introduction to routing, see Basic routing.
var express = require('express');
var router = express.Router();

// Require controller modules.
var user_controller = require('../controllers/userController');
var login_controller = require('../controllers/loginController');
var matches_controller = require('../controllers/matchesController');


//viwe frontend 
router.get('/', login_controller.frontpage_get);

router.post('/login', login_controller.login_post);

router.get('/logout', login_controller.logout);


//User register form
router.get('/register', user_controller.user_create_get);

router.post('/register', user_controller.user_create_post);


// User CRUD
router.get('/user', user_controller.user_detail);

router.get('/user/update', user_controller.user_create_get);

router.post('/user/update', user_controller.user_create_post);

router.get('/user/:id/delete', user_controller.user_delete_get);

router.post('/user/:id/delete', user_controller.user_delete_post);

router.get('/user/:id/update', user_controller.user_update_get);

router.post('/user/:id/update', user_controller.user_update_post);

router.get('/user/:id', user_controller.user_detail);

router.get('/users', user_controller.user_list_possible_matches);

router.post('/user/:id/updatepassword/', user_controller.user_update_password_get);



// Matches CRUD
router.get('/matches/get-more', matches_controller.show_possible_match);

router.post('/matches/:id/:name', matches_controller.make_skip_match);

router.get('/matches', matches_controller.see_all_matches);

module.exports = router;

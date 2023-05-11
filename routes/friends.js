const express = require("express");
const router = express.Router();
const passport = require("passport");
const friendsController = require("../controllers/friends_controller");

router.get('/profile/:id/toggle_friend' , passport.checkAuthentication ,friendsController.toggle_friendship);
module.exports = router;
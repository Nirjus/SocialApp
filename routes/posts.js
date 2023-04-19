const express = require("express");
const passport = require("passport");

const router = express.Router();
const postControllers = require("../controllers/posts_controllers");
router.post("/create", passport.checkAuthentication,postControllers.create);


module.exports = router;
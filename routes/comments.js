const express = require("express");
const router = express.Router();
const passport = require("passport");


const commentsControllers = require("../controllers/comments_controler");
router.post("/create", passport.checkAuthentication,commentsControllers.create);
router.get("/destroy/:id",passport.checkAuthentication,commentsControllers.destroy);

module.exports = router;
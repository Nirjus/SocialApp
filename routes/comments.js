const express = require("express");
const passport = require("passport");

const router = express.Router();
const commentsControllers = require("../controllers/comments_controler");
router.post("/create", passport.checkAuthentication,commentsControllers.create);
router.get("/destroy/:id",passport.checkAuthentication,commentsControllers.destroy);

module.exports = router;
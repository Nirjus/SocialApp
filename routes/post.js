const express = require("express");

const router = express.Router();
const postControllers = require("../controllers/posts_controllers");
router.get("/posts",postControllers.posts);


module.exports = router;
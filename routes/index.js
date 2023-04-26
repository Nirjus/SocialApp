const express = require("express");
const router  = express.Router();
const homeController = require("../controllers/home_controllers")

console.log("router Loaded");

router.get("/",homeController.home);
router.use("/users",require("./users"))
router.use("/posts",require("./posts"))
router.use("/comments",require("./comments"));
//for any further routers acess from here
//routers.use("/routerName",require("./routerFile"));
module.exports = router;
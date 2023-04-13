const express = require("express");
const router  = express.Router();
const homeController = require("../controllers/home_controllers")

console.log("router Loaded");

router.get("/",homeController.home);
router.use("/users",require("./users"))
router.use("/users",require("./post"))
//for any further routers acess from here
//routers.use("/routerName",require("./routerFile"));
module.exports = router;
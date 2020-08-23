const express = require("express");
const multer = require("multer");
const AuthService = require("../services/Authentication");
const { UserFromJwtMiddleware } = require("../services/Authentication");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, "./uploads");
    },
    filename:function(req, file,cb){
        cb(null, Date.now()+".jpg");
    }
})
var router = express.Router();
router.use(AuthService.UserFromJwtMiddleware);
router.get("/class",async function(req,res) {
    res.send("you got rickrolled");
});


module.exports = router;
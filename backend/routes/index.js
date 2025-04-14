const express = require("express");
const adminrouter = require('./admin')
const customerrouter = require('./customer')
const router = express.Router();
router.use("/admin", adminrouter)
router.use("/customer", customerrouter)

    
module.exports=router
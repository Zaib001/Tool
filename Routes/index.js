const express = require("express");
const router = express.Router();


const AIController = require("../Controller/AIToolController");

// formdata
router.post('/addformdata' , AIController.addToolsdata)


// router.post('/create-checkout-session' , paymentController.create);






module.exports = router;

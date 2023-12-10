const express = require("express");
const router = express.Router();


const AIController = require("../Controller/AIToolController");
const paymentController = require("../Controller/PaymentController");




// AITools 
router.get('/AItools', AIController.getAITool);
//post ai tools
router.post('/addtools' , AIController.addTools)
// formdata
router.post('/addformdata' , AIController.addToolsdata)


router.post('/create-checkout-session' , paymentController.create);






module.exports = router;

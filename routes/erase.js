var express = require('express');
var router = express.Router();

// Route to delete all trades
//BEGIN
var TradeControllers = require('../controllers/trades')

router.get('/erase', TradeControllers.eraseAllTrades)
//END
module.exports = router;

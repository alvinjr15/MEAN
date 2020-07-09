var express = require('express');
var router = express.Router();

// Route to delete all trades
//BEGIN
var TradeControllers = require('../controllers/trades')

router.delete('/', TradeControllers.eraseAllTrades)
//END

module.exports = router;

var express = require('express');
var router = express.Router();

// Routes related to trades
//BEGIN
var TradeControllers = require('../controllers/trades')

router.get('/erase', TradeControllers.eraseAllTrades)

//POST /trades
router.post('/trades', TradeControllers.addTrade);

//GET  /trades
router.get('/trades', TradeControllers.getAllTrades);

//GET /trades/users/{userID}
router.get('trades/users/:userID', TradeControllers.getTradesByUserId)

//END
module.exports = router;
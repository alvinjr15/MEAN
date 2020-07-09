var express = require('express');
var router = express.Router();

// Routes related to trades
//BEGIN
var TradeControllers = require('../controllers/trades')

//POST /trades
router.post('/', TradeControllers.addTrade);

//GET  /trades
router.get('/', TradeControllers.getAllTrades);

//GET /trades/users/{userID}
router.get('/users/:userID', TradeControllers.getTradesByUserId)
router.get('/test', TradeControllers.author_delete_get);
//END

module.exports = router;
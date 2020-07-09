var express = require('express');
var router = express.Router();

// Routes related to stocks
//BEGIN
var StockControllers = require('../controllers/stocks')

//GET /stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}
router.get('/:stockSymbol/trades', StockControllers.getAllStocksByDate)

//GET /stocks/{stockSymbol}/price
router.get('/:stockSymbol/price/', StockControllers.getHighestLowest)
//END

module.exports = router;
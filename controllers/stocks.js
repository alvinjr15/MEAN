var StockServices = require('../services/stock.services')    
//Get /stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}
exports.getAllTrades = async function(req, res, next){
    try {
        var trades = await StockServices.getAlTrades(req.params.stockSymbol, req.query.tradeType, req.query.start, req.query.end);
        return res.status(200).json({ status: 200, data: trades, message: "get trades" });
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
//GET /stocks/{stockSymbol}/price?start={startDate}&end={endDate}
exports.getHighestLowest = async function (symbol, startDate, endDate) {
    try {
        var trades = await StockServices.getHighAndLowPrice(req.params.stockSymbol, req.query.start, req.query.end);
        return res.status(200).json({ status: 200, data: trades, message: "get trades" });
    } catch (e) {
        return res.status(404).json({ status: 400, message: e.message });
    }
}
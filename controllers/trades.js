var TradeServices = require('../services/trade.services')    

//DELETE /erase
exports.eraseAllTrades = async function (req, res, next){
    try {
        var users = await TradeServices.deleteAllTrades()
        return res.status(200).json({ status: 200, data: {}, message: "Succesfully Delete All Trades" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//POST /trades
exports.addTrade = async function (req, res, next){
    try {
        var trade = await TradeServices.addTrade(req.body)
        return res.status(200).json({ status: 201, data: trade, message: "Succesfully Add Trade" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
//GET  /trades
exports.getAllTrades = async function(req, res, next){
    try {
        var trades = await TradeServices.getAllTrades();
        return res.status(200).json({ status: 200, data: trades, message: "Succesfully Add Trade" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//GET /trades/users/{userID}
exports.getTradesByUserId = async function(req, res, next){
    try {
        var trades = await TradeServices.getAllTrades(req.params.userID);
        return res.status(200).json({ status: 200, data: trades, message: "Succesfully Add Trade" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
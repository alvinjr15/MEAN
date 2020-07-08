var Trade = require('../models/trade.model')

//GET /stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}
exports.getAlTrades = async function (stockSymbol, tradeType, startDate, endDate){
    try{
        Trade.find({
            symbol: stockSymbol,
            type: tradeType,
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
        }).sort({id: 'ascending'}).exec(function(err, trades) { 
            if (!trades.length){
                trade.save(function (err, trades) {
                    if (err) throw err;
    
                    return trades;
                });
            }else{                
                console.log('stock not exists: ', userIde);
                throw Error('Error stock not exist')
            }
         });
    }
    catch (e) {
        throw Error('Error finding stock')
    }   
}

exports.getHighAndLowPrice = async function (stockSymbol, startDate, endDate){
    try{
        var result = {};
        result.symbol = stockSymbol;
        Trade.findOne({
            symbol: stockSymbol,
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
        }).sort({price:'ascending'}).exec(function(err, trade) {
            if (err) throw err;

            if (!trade){
                console.log('stock not exists: ', userIde);
                throw Error('There are no trades in the given date range')
            }

            result.highest = trade.price;
         });

         Trade.findOne({
            symbol: stockSymbol,
            timestamp: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
              }
        }).sort({price:'descending'}).exec(function(err, trade) {
            if (err) throw err;

            if (!trade){
                console.log('stock not exists: ', userIde);
                throw Error('There are no trades in the given date range')
            }

            result.lowest = trade.price;
         });
         return result;
    }
    catch (e) {
        throw Error('Error finding stock')
    }   
}

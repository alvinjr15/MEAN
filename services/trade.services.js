var Trade = require('../models/trade.model')

exports.deleteAllTrades = async function () {
    try {
        await Trade.remove().exec()
    } catch (e) {
        // Log Errors
        throw Error('Error while Removing Trades')
    }
}

exports.createTrade = async function (tradeObject) {
    try {
        var trade = new Trade(trade);
        Trade.find({id : tradeObject.id}, function (err, docs) {
            if (!docs.length){
                trade.save(function (err, trade) {
                    if (err) throw err;
    
                    console.log('trade successfully saved.');
                    });
            }else{                
                console.log('trade exists: ',self.name);
                throw Error('Error trade already exist')
            }
        });
    } catch (e) {
        // Log Errors
        throw Error('Error create Trade')
    }
}
exports.getAllTrades = async function () {
    try{
        Trade.find({}).sort({id: 'ascending'}).exec(function(err, trades) { 
            if (err) throw err;
     
            return trades;
         });
    }
    catch (e) {
        throw Error('Error create Trade')

    }
}
exports.getAllTradesByUserId = async function(userId){
    try{
        Trade.find({'user.id': userId}).sort({id: 'ascending'}).exec(function(err, trades) { 
            if (!trades.length){
                trade.save(function (err, trade) {
                    if (err) throw err;
    
                    return trades;
                });
            }else{                
                console.log('user not exists: ', userIde);
                throw Error('Error user not exist')
            }
         });
    }
    catch (e) {
        throw Error('Error create Trade')
    }
}

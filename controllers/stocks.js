const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./emp_database.db');
//Get /stocks/{stockSymbol}/trades?type={tradeType}&start={startDate}&end={endDate}
getTradesJSON = function(rows){
    var trades = [];

    rows.forEach(element => { 
        trades.push({
            id: element.id,
            type: element.type,
            user: {
                id: element.user_id,
                name: element.user_name
            },
            symbol: element.symbol,
            shares: element.shares,
            price: element.price,
            timestamp: element.timeCreate

        })
      }); 

      return trades;
};
exports.getAllStocksByDate = async function(req, res, next){
    try{
        db.all("SELECT * FROM trades where symbol = ?", [req.params.stockSymbol], (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(400).json();
                return;
            }
            if (rows.length > 0){
                var endDate = new Date(req.query.end);
                endDate = endDate.addDays(1);
                db.all("SELECT * FROM trades WHERE symbol = ? AND type = ? AND (timeCreate BETWEEN '"+req.query.start+"' AND '"+ endDate+"') ORDER BY id ASC;", 
                    [req.params.stockSymbol, req.query.type], (err2, rows2) => {

                    if (err2) {
                        console.log(err2.message);
                        res.status(400).json();
                        return;
                    }
                    res.status(200).json(getTradesJSON(rows2));
                    return;
                });
            }
            else{
                return res.status(404).json({});
            }
        });
    }
    catch (e) {
        return res.status(400).json();
    }
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
//GET /stocks/{stockSymbol}/price?start={startDate}&end={endDate}
exports.getHighestLowest = async function (req, res, next) {
    try{
        db.all("SELECT * FROM trades where symbol = ?", [req.params.stockSymbol], (err, rows) => {
            if (err) {
                res.status(400).json();
                return;
            }
            if(rows.length > 0){
                var endDate = new Date(req.query.end);
                endDate = endDate.addDays(1);
                db.get(
                    "SELECT MIN(price) AS SmallestPrice, MAX(price) AS MaxPrice FROM Trades WHERE symbol = ? AND (timeCreate BETWEEN '"+req.query.start+"' AND '"+ endDate+"');", 
                    [req.params.stockSymbol], (err,row)=>{
                    if (err) {
                        res.status(400).json();
                        return;
                    }
                    if(row){
                        return res.status(200).json({ status_code: 200, body: {symbol:req.params.stockSymbol, highest: row.MaxPrice, lowest: row.SmallestPrice }, message: "get trades" });
                    }
                    else{
                        return res.status(200).json({ status_code: 200, message: "There are no trades in the given date range" });
                    }
                });
            }
            else{
                return res.status(404).json({});
            }
        });
    }
    catch (e) {
        return res.status(400).json();
    }
}
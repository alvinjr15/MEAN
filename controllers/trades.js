const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./emp_database.db');

//DELETE /erase
exports.eraseAllTrades = async function (req, res, next){
    try {
        db.run("DELETE FROM trades;", [], function (err, result) {
            if (err) {
                console.log(err.message);
                res.status(400).json({ "error": err.message })
                return;
            }
            return res.status(200).json();
        });
    } catch (e) {
        return res.status(400).json();
    }
}
//POST /trades
exports.addTrade = async function (req, res, next){
    try {
        var reqBody = req.body;
        db.run("INSERT INTO trades (id, type, user_id, user_name, symbol, shares, price, timeCreate) VALUES (?,?,?,?,?,?,?,?)",
        [reqBody.id, reqBody.type, reqBody.user.id, reqBody.user.name, reqBody.symbol, reqBody.shares, reqBody.price, reqBody.timestamp],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({});
        });
    } catch (e) {
        return res.status(400).json({ status_code: 400, message: e.message });
    }
}
//GET  /trades
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

exports.getAllTrades = async function(req, res, next){
    try{
        db.all("SELECT * FROM trades ORDER BY id ASC", [], (err, rows) => {
            if (err) {
                res.status(400).json();
                return;
            }
            res.status(200).json(getTradesJSON(rows));
            return;
        });
    }
    catch (e) {
        return res.status(400).json();
    }
}

//GET /trades/users/{userID}
exports.getTradesByUserId = async function(req, res, next){
    try{
        db.all("SELECT * FROM trades where user_id = ? ORDER BY id ASC;", [req.params.userID], (err, rows) => {
            if (err) {
                res.status(404).json();
                return;
            }
            if(rows.length > 0){
                return res.status(200).json(getTradesJSON(rows));
            }
            else{
                return res.status(404).json();
            }
        });
    }
    catch (e) {
        return res.status(404).json();
    }
}
var formatDate = function (date) {
    var myDate = new Date(date);

    var y = myDate.getFullYear(),
        m = myDate.getMonth() + 1, // january is month 0 in javascript
        d = myDate.getDate();

    // Get the DD-MM-YYYY format
    return formatDigit(d) + "-" + formatDigit(m) + "-" + y;
}
    /**
     * Format a month or day in two digit.
     */
    var formatDigit = function (val) {
        var str = val.toString();
        return (str.length < 2) ? "0" + str : str
    };
exports.author_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};
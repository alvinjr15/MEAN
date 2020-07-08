var mongoose = require('mongoose')
mongoose.connect(
    'mongodb://localhost/testdb'
);

const UserSchema  = new mongoose.Schema({
    id: Number,
    name: String
});
const TradeSchema  = new mongoose.Schema({
    id: Number,
    type: String,
    user: UserSchema,
    symbol: String,
    shares: Number,
    price: {
        type: Number,
        min:130.42, 
        max:195.65        
    },
    timestamp: { 
        type: Date,
        default: Date.now
    }
});



const Trade = mongoose.model('Trade', TradeSchema)

module.exports = Trade;
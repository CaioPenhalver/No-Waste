var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var Timeline = new Schema({
  date: Date,
  type: String,
  description: String,
  value: Currency
});


module.exports = mongoose.model('Timeline', Timeline);

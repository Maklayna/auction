const db = require('mongoose');

const { Schema } = db;

const ProductShema = new db.Schema({
  tag: String,
  createDate: { type: Date, default: new Date() },
  startDate: Date,
  endDate: Date,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  src: String,
  tmb_src: String,
  startPrice: Number,
  stakeHistory: { type: [{ user: String, stake: Number }], default: [] },
});
module.exports = db.model('Product', ProductShema);

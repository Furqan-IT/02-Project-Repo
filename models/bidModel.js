import mongoose from "mongoose";

const BidSchema = new mongoose.Schema(
  {
    bid_amount_str: { type: String },
    bid_amount: { type: String },
    bid_string: { type: String },
    bid_type: { type: String },
    date: { type: String },
    game_name: { type: String },
    gameid: { type: String },
    item_type: { type: String },
    key: { type: String },
    time: { type: String },
    total: { type: String },
    userid: { type: String },
    userphone: { type: String },
    username: { type: String },
    month: { type: String },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;

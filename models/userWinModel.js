import mongoose from "mongoose";

const UserWinSchema = new mongoose.Schema(
  {
    game_key: { type: String, default: "" },
    game_name: { type: String, default: "" },
    game_result: { type: String, default: "" },
    key: { type: String, required: true, unique: true }, // Unique identifier
    result_key: { type: String, default: "" },
    userid: { type: String, default: "" },
    username: { type: String, default: "" },
    userphone: { type: String, default: "" },
    win_amount: { type: String, default: "" },
    win_date: { type: String, default: "" },
    win_time: { type: String, default: "" },
    bit_amount: { type: String, default: "" },
    bid_type: { type: String, default: "" },
    win_number: { type: String, default: "" },
    wintime: { type: String, default: "" },
    month: { type: String, default: "" },
    bid_am_str: { type: String, default: "" },
    index: { type: String, default: "" },
    totalbid: { type: String, default: "" },
    totalwin: { type: String, default: "" },
    bidnumber: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserWin = mongoose.model("UserWin", UserWinSchema);

export default UserWin;

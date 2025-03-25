import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    gameOff: { type: Boolean, default: false },
    sundayoff: { type: Boolean, default: false },
    result_show: { type: Boolean, default: false },
    game_hide: { type: Boolean, default: false },
    gante: { type: String, default: "" },
    key: { type: String, default: "" },
    minutes: { type: String, default: "" },
    name: { type: String, default: "" },
    rate: { type: String, default: "" },
    time12: { type: String, default: "" },
    time12format: { type: String, default: "" },
    time24format: { type: String, default: "" },
    harup_rate: { type: String, default: "" },
    result_time: { type: String, default: "" },
    status: { type: String, default: "" },
    order: { type: String, default: "" },
    imagelink: { type: String, default: "" },
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", GameSchema);

export default Game;

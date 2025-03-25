import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    added_date: { type: String, default: "" },
    game_key: { type: String, default: "" },
    game_name: { type: String, default: "" },
    key: { type: String, required: true, unique: true }, // Unique identifier
    jodi_rate: { type: String, default: "" },
    harup_rate: { type: String, default: "" },
    result: { type: String, default: "" },
    result_date: { type: String, default: "" },
    month: { type: String, default: "" },
    list: { type: [String], default: [] }, // Array of strings
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", ResultSchema);

export default Result;

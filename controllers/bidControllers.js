import expressAsyncHandler from "express-async-handler";
import Bid from "../models/bidModel.js";
import Game from "../models/gameModel.js";
import moment from "moment";

const createBid = expressAsyncHandler(async (req, res) => {
  const {
    bid_amount_str = "",
    bid_amount = "",
    bid_string = "",
    bid_type = "",
    date = "",
    game_name = "",
    gameid = "",
    item_type = "",
    key = "",
    time = "",
    total = "",
    userid = "",
    userphone = "",
    username = "",
    month = "",
  } = req.body;

  // Fetch the game document using the gameid (which is the key in the Game model)
  const game = await Game.findOne({ key: gameid });

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  // Extract time12format (e.g., "10:00:00 AM-02:15:00 PM")
  const time12format = game.time12format;

  // Split into startTime and endTime
  const [startTimeStr, endTimeStr] = time12format
    .split("-")
    .map((t) => t.trim());

  // Current time in hh:mm:ss A format (e.g., "01:00:00 PM")
  const currentTimeStr = moment().format("hh:mm:ss A");

  // Convert all times to moment objects for comparison
  const startTime = moment(startTimeStr, "hh:mm:ss A");
  const endTime = moment(endTimeStr, "hh:mm:ss A");
  const currentTime = moment(currentTimeStr, "hh:mm:ss A");

  // Check if current time is within the game's time range
  const isWithinTimeRange = currentTime.isBetween(
    startTime,
    endTime,
    null,
    "[]"
  ); // '[]' includes start and end times

  if (!isWithinTimeRange) {
    return res.status(400).json({
      message: "The game has ended. You cannot bid on this game now.",
    });
  }

  // Create the bid if the current time is valid
  const bid = await Bid.create({
    bid_amount_str,
    bid_amount,
    bid_string,
    bid_type,
    date,
    game_name,
    gameid,
    item_type,
    key,
    time,
    total,
    userid,
    userphone,
    username,
    month,
  });

  if (bid) {
    return res.status(201).json({
      success: true,
      message: "Bid created successfully",
      status_code: 200,
      data: bid,
    });
  } else {
    return res.status(400).json({ message: "Failed to create bid" });
  }
});

// Update an existing bid
const updateBid = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  const bid = await Bid.findById(id);
  if (!bid) {
    return res.status(404).json({ message: "Bid not found" });
  }

  const updatedBid = await Bid.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Bid updated successfully",
    status_code: 200,
    bid: updatedBid,
  });
});

// Delete a bid
const deleteBid = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const bid = await Bid.findById(id);
  if (!bid) {
    return res.status(404).json({ message: "Bid not found" });
  }

  await Bid.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Bid deleted successfully",
    status_code: 200,
  });
});

const getFilteredBids = expressAsyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { userid, gameid, date } = req.query;

    // Create a dynamic filter object
    let filter = {};

    if (userid) filter.userid = userid;
    if (gameid) filter.gameid = gameid;
    if (date) filter.date = date;

    // Fetch bids based on the dynamic filter
    const bids = await Bid.find(filter);

    if (!bids || bids.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching bids found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bids retrieved successfully",
      data: bids,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export { createBid, updateBid, deleteBid, getFilteredBids };

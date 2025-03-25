import expressAsyncHandler from "express-async-handler";
import UserWin from "../models/userWinModel.js";

const createUserWin = expressAsyncHandler(async (req, res) => {
  const newUserWin = new UserWin(req.body);

  await newUserWin.save();

  return res.status(201).json({
    success: true,
    message: "User win record created successfully",
    data: newUserWin,
  });
});

const updateUserWinByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const userWin = await UserWin.findOne({ key });
  if (!userWin) {
    return res
      .status(404)
      .json({ success: false, message: "User win record not found" });
  }

  const updatedUserWin = await UserWin.findOneAndUpdate({ key }, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "User win record updated successfully",
    data: updatedUserWin,
  });
});

const deleteUserWinByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const userWin = await UserWin.findOne({ key });
  if (!userWin) {
    return res
      .status(404)
      .json({ success: false, message: "User win record not found" });
  }

  await userWin.deleteOne();

  return res.status(200).json({
    success: true,
    message: "User win record deleted successfully",
  });
});

const getFilteredUserWins = expressAsyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { win_date, game_key } = req.query;

    // Create a dynamic filter object
    let filter = {};

    if (win_date) filter.win_date = win_date;
    if (game_key) filter.game_key = game_key;

    // Fetch UserWins based on the dynamic filter
    const userWins = await UserWin.find(filter);

    if (!userWins || userWins.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching user wins found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "User wins retrieved successfully",
      data: userWins,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export {
  createUserWin,
  updateUserWinByKey,
  deleteUserWinByKey,
  getFilteredUserWins,
};

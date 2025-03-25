import expressAsyncHandler from "express-async-handler";
import Result from "../models/resultModel.js";
import UserWin from "../models/userWinModel.js";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";

const createResult = expressAsyncHandler(async (req, res) => {
  const newResult = new Result(req.body);

  await newResult.save();

  return res.status(201).json({
    success: true,
    message: "Game created successfully",
    data: newResult,
  });
});

const updateResultByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const result = await Result.findOne({ key });
  if (!result) {
    return res
      .status(404)
      .json({ success: false, message: "Result not found" });
  }

  const updatedResult = await Result.findOneAndUpdate({ key }, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Result updated successfully",
    data: updatedResult,
  });
});

const deleteResultByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  console.log(`Received request to delete result with key: ${key}`);

  // 1. Find the result document by key
  const resultDoc = await Result.findOne({ key });
  if (!resultDoc) {
    console.log(`Result not found for key: ${key}`);
    return res.status(404).json({
      success: false,
      message: "Result not found",
    });
  }

  // 2. Find all UserWin documents with matching result_key
  const userWinDocs = await UserWin.find({ result_key: key });
  console.log(
    `Found ${userWinDocs.length} UserWin documents for result_key: ${key}`
  );

  let balanceUpdates = 0;

  // 3. Update user balances
  for (const winDoc of userWinDocs) {
    const userId = winDoc.userid; // using "userid" field
    const winAmount = Number(winDoc.win_amount); // convert win_amount to number

    // Find user by matching the userid field in the User model
    const userDoc = await User.findOne({ userid: userId });

    if (userDoc) {
      const currentBalance = Number(userDoc.balance);
      const newBalance = currentBalance - winAmount;

      await User.findOneAndUpdate(
        { userid: userId },
        { $set: { balance: newBalance.toString() } }
      );

      balanceUpdates++;
      console.log(
        `Updated balance for user: ${userId} | Old Balance: ${currentBalance}, New Balance: ${newBalance}`
      );
    }
  }

  console.log(`Total user balances updated: ${balanceUpdates}`);

  // 4. Delete all UserWin documents
  const deletedUserWins = await UserWin.deleteMany({ result_key: key });
  console.log(
    `Deleted ${deletedUserWins.deletedCount} UserWin documents for result_key: ${key}`
  );

  // 5. Delete all Transaction documents where ifsc_code matches the key
  const deletedTransactions = await Transaction.deleteMany({ ifsc_code: key });
  console.log(
    `Deleted ${deletedTransactions.deletedCount} Transaction documents for ifsc_code: ${key}`
  );

  // 6. Finally, delete the result document itself
  await resultDoc.deleteOne();
  console.log(`Deleted Result document with key: ${key}`);

  return res.status(200).json({
    success: true,
    message:
      "Result, associated user wins, and related transactions deleted successfully.",
  });
});

const getAllResults = expressAsyncHandler(async (req, res) => {
  const { result_date } = req.body; // Properly extract result_date

  // Validate input
  if (!result_date || result_date.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Result Date is required",
    });
  }

  // Fetch all results with the given result_date
  const results = await Result.find({ result_date });

  // Check if no results found
  if (!results || results.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Documents found in Result",
      data: [],
    });
  }

  // Send success response
  return res.status(200).json({
    success: true,
    message: "Documents Retrieved Successfully",
    data: results,
  });
});

const getAllResultsOnGameKey = expressAsyncHandler(async (req, res) => {
  const { game_key } = req.body; // Properly extract result_date

  // Validate input
  if (!game_key || game_key.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Game Key is required",
    });
  }

  // Fetch all results with the given result_date
  const results = await Result.find({ game_key });

  // Check if no results found
  if (!results || results.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Documents found in Result",
      data: [],
    });
  }

  // Send success response
  return res.status(200).json({
    success: true,
    message: "Documents Retrieved Successfully",
    data: results,
  });
});

const getAllResultsOnMonth = expressAsyncHandler(async (req, res) => {
  const { month } = req.body; // Properly extract result_date

  // Fetch all results with the given result_date
  const results = await Result.find({ month });

  // Check if no results found
  if (!results) {
    return res.status(404).json({
      success: false,
      message: "No Documents found in Result",
      data: [],
    });
  }

  // Send success response
  return res.status(200).json({
    success: true,
    message: "Documents Retrieved Successfully",
    data: results,
  });
});

const checkResult = expressAsyncHandler(async (req, res) => {
  try {
    const { game_key, result_date } = req.query; // Extract query parameters

    if (!game_key || !result_date) {
      return res.status(400).json({
        success: false,
        message: "Both game_key and result_date are required.",
      });
    }

    // Find documents matching game_key and result_date
    const results = await Result.find({ game_key, result_date });

    if (results.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No document found for the provided game_key and result_date.",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Documents retrieved successfully.",
      data: results,
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
  createResult,
  updateResultByKey,
  deleteResultByKey,
  getAllResults,
  getAllResultsOnGameKey,
  checkResult,
  getAllResultsOnMonth,
};

import expressAsyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";

// @route   POST /api/transactions
// @desc    Create a new transaction (allows empty strings)
// @access  Public
const addTransaction = expressAsyncHandler(async (req, res) => {
  const transactionData = req.body;

  // Validate that 'key' is provided
  if (!transactionData.key) {
    res.status(400);
    throw new Error("Key is required");
  }

  const transaction = await Transaction.create(transactionData);

  if (transaction) {
    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      status_code: 201,
      data: transaction,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create transaction");
  }
});

// @route   PUT /api/transactions/:key
// @desc    Update a transaction based on key (allows partial updates)
// @access  Public
const updateTransaction = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const transaction = await Transaction.findOne({ key });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  // Update only the provided fields
  Object.keys(req.body).forEach((field) => {
    transaction[field] = req.body[field];
  });

  const updatedTransaction = await transaction.save();

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    status_code: 200,
    data: updatedTransaction,
  });
});

// @route   DELETE /api/transactions/:key
// @desc    Delete a transaction based on key
// @access  Public
const deleteTransaction = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const transaction = await Transaction.findOne({ key });

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }

  await transaction.deleteOne();

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
    status_code: 200,
  });
});

const getFilteredTransactions = expressAsyncHandler(async (req, res) => {
  try {
    // Extract query parameters
    const { UserId, Date, Month } = req.query;

    // Create a dynamic filter object
    let filter = {};

    if (UserId) filter.UserId = UserId;
    if (Date) filter.Date = Date;
    if (Month) filter.Month = Month;

    // Fetch transactions based on the dynamic filter
    const transactions = await Transaction.find(filter);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching transactions found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transactions retrieved successfully",
      data: transactions,
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
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getFilteredTransactions,
};

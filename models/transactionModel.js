import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    Amount: { type: String, default: "" },
    Balance: { type: String, default: "" },
    Date: { type: String, default: "" },
    Note: { type: String, default: "" },
    month: { type: String, default: "" },
    Payment_Method: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    Screenshot: { type: String, default: "" },
    Transaction_Type: { type: String, default: "" },
    UserId: { type: String, default: "" },
    UserName: { type: String, default: "" },
    ifsc_code: { type: String, default: "" },
    key: { type: String, unique: true, required: true },
    status: { type: String, default: "" },
    time: { type: String, default: "" },
    transaction_id: { type: String, default: "" },
    transfer_from: { type: String, default: "" },
    transfer_to: { type: String, default: "" },
    upi_number: { type: String, default: "" },
    withdraw_com: { type: String, default: "" },
    offer_am: { type: String, default: "" },
    userModel: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;

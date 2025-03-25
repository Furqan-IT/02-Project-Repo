import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    mobileid: { type: String },
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    profileimage: { type: String },
    password: { type: String, required: true },
    balance: { type: String },
    dob: { type: String },
    status: { type: String },
    user_type: { type: String },
    lastlogin: { type: String },
    registerdate: { type: String },
    ref_by: { type: String },
    refcode: { type: String },
    phonepe: { type: String },
    paytm: { type: String },
    upi: { type: String },
    gpay: { type: String },
    bankname: { type: String },
    ifsccode: { type: String },
    accountnumber: { type: String },
    admin_permission: { type: String },
    plandate: { type: String },
    plankey: { type: String },
    refing: { type: String },
    biding: { type: String },
    winning: { type: String },
    deposit: { type: String },
    withdraw: { type: String },
    user_payment_qr: { type: String },
    agent_id: { type: String },
    agent_type: { type: String },
    bonus_balance: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

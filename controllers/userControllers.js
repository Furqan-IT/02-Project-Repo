import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Bid from "../models/bidModel.js";
import Transaction from "../models/transactionModel.js";
import Result from "../models/resultModel.js";
import Notification from "../models/notificationModel.js";

const registerUser = expressAsyncHandler(async (req, res) => {
  const {
    userid,
    mobileid,
    name,
    phone,
    email,
    profileimage,
    password,
    balance,
    dob,
    status,
    user_type,
    lastlogin,
    registerdate,
    ref_by,
    refcode,
    phonepe,
    paytm,
    upi,
    gpay,
    bankname,
    ifsccode,
    accountnumber,
    admin_permission,
    plandate,
    plankey,
    refing,
    biding,
    winning,
    deposit,
    withdraw,
    user_payment_qr,
    agent_id,
    agent_type,
    bonus_balance,
  } = req.body;

  if (!email && !phone) {
    return res
      .status(400)
      .json({ message: "Email or phone number is required" });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email || null }, { phone: phone || null }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingUser.phone === phone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }
  }

  const newUser = new User({
    userid: userid || "",
    mobileid: mobileid || "",
    name: name || "",
    phone: phone || "",
    email: email || "",
    profileimage: profileimage || "",
    password,
    balance: balance || "0",
    dob: dob || "",
    status: status || "active",
    user_type: user_type || "user",
    lastlogin: lastlogin || "",
    registerdate: registerdate || new Date().toISOString(),
    ref_by: ref_by || "",
    refcode: refcode || "",
    phonepe: phonepe || "",
    paytm: paytm || "",
    upi: upi || "",
    gpay: gpay || "",
    bankname: bankname || "",
    ifsccode: ifsccode || "",
    accountnumber: accountnumber || "",
    admin_permission: admin_permission || "",
    plandate: plandate || "",
    plankey: plankey || "",
    refing: refing || "",
    biding: biding || "",
    winning: winning || "",
    deposit: deposit || "",
    withdraw: withdraw || "",
    user_payment_qr: user_payment_qr || "",
    agent_id: agent_id || "",
    agent_type: agent_type || "",
    bonus_balance: bonus_balance || "",
  });

  const savedUser = await newUser.save();
  console.log("User Created Successfully", savedUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: savedUser });
});

const authUser = expressAsyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  // Validate input
  if ((!email && !phone) || !password) {
    return res
      .status(400)
      .json({ message: "Email or phone and password are required" });
  }

  // Find user by email or phone
  const user = await User.findOne({
    $or: [{ email: email || null }, { phone: phone || null }],
  });

  // Check if user exists and password matches
  if (user && user.password === password) {
    return res.status(200).json({
      message: "Login successful",
      user: {
        userid: user.userid,
        mobileid: user.mobileid,
        name: user.name,
        phone: user.phone,
        password: user.password,
        email: user.email,
        profileimage: user.profileimage,
        balance: user.balance,
        dob: user.dob,
        status: user.status,
        user_type: user.user_type,
        lastlogin: user.lastlogin,
        registerdate: user.registerdate,
        ref_by: user.ref_by,
        refcode: user.refcode,
        phonepe: user.phonepe,
        paytm: user.paytm,
        upi: user.upi,
        gpay: user.gpay,
        bankname: user.bankname,
        ifsccode: user.ifsccode,
        accountnumber: user.accountnumber,
        admin_permission: user.admin_permission,
        plandate: user.plandate,
        plankey: user.plankey,
        refing: user.refing,
        biding: user.biding,
        winning: user.winning,
        deposit: user.deposit,
        withdraw: user.withdraw,
        user_payment_qr: user.user_payment_qr,
        agent_id: user.agent_id,
        agent_type: user.agent_type,
        bonus_balance: user.bonus_balance,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } else {
    return res.status(401).json({ message: "Invalid email/phone or password" });
  }
});

const checkUser = expressAsyncHandler(async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    return res.status(400).json({
      success: false,
      message: "Please provide either email or phone",
    });
  }

  let user;
  if (email) {
    user = await User.findOne({ email });
  } else if (phone) {
    user = await User.findOne({ phone });
  }

  if (!user) {
    return res.status(200).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const { user_type } = req.body;
  try {
    // Case-insensitive user_type filter using regex
    const users = await User.find({ user_type: user_type });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Users Found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const getAllUsersForAgent = expressAsyncHandler(async (req, res) => {
  const { agent_id } = req.body;
  try {
    // Case-insensitive user_type filter using regex
    const users = await User.find({ agent_id: agent_id });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Users Found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users Retrieved Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const { userid } = req.params; // Extract userid from params

  try {
    // Check if the user exists based on the userid field
    const user = await User.findOne({ userid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent empty updates
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    // Update user dynamically based on the userid field
    const updatedUser = await User.findOneAndUpdate(
      { userid }, // Match based on userid
      { $set: req.body }, // Dynamically update provided fields
      { new: true, runValidators: true } // Return updated doc & run validation
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const { userid } = req.params;

    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "UserID is required.",
      });
    }

    // Step 1: Delete user from User model
    const user = await User.findOneAndDelete({ userid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Step 2: Delete user-related data from all models
    await Promise.all([
      Bid.deleteMany({ userid }), // Match `userid`
      Transaction.deleteMany({ UserId: userid }), // Match `UserId`
      Notification.deleteMany({ UserId: userid }), // Match `UserId`
      Result.deleteMany({ userid }), // Match `userid`
    ]);

    return res.status(200).json({
      success: true,
      message: "User and all associated data deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// ✅ GET user by refcode
const getUserByRefCode = expressAsyncHandler(async (req, res) => {
  const { refcode } = req.params;

  const user = await User.findOne({ refcode });

  if (user) {
    res.status(200).json({
      success: true,
      message: "User found",
      status_code: 200,
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User Not Found",
      status_code: 404,
    });
  }
});

// ✅ GET user by userid
const getUserByUserId = expressAsyncHandler(async (req, res) => {
  const { userid } = req.params;

  const user = await User.findOne({ userid });

  if (user) {
    res.status(200).json({
      success: true,
      message: "User found",
      status_code: 200,
      data: user,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "User Not Found",
      status_code: 404,
    });
  }
});

export {
  registerUser,
  authUser,
  checkUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllUsersForAgent,
  getUserByUserId,
  getUserByRefCode,
};

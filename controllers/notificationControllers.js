import expressAsyncHandler from "express-async-handler";
import Notification from "../models/notificationModel.js";

const createNotification = expressAsyncHandler(async (req, res) => {
  const newNotification = new Notification(req.body);

  await newNotification.save();

  return res.status(201).json({
    success: true,
    message: "Notification created successfully",
    data: newNotification,
  });
});

const updateNotificationByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const notification = await Notification.findOne({ key });
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found" });
  }

  const updatedNotification = await Notification.findOneAndUpdate(
    { key },
    req.body,
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Notification updated successfully",
    data: updatedNotification,
  });
});

const deleteNotificationByKey = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;
  console.log(key);

  const notification = await Notification.findOne({ key });
  if (!notification) {
    return res
      .status(404)
      .json({ success: false, message: "Notification not found" });
  }

  await notification.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
  });
});

const getAllNotifications = expressAsyncHandler(async (req, res) => {
  const { UserId } = req.params; // Destructure correctly

  if (!UserId) {
    return res.status(400).json({
      success: false,
      message: "UserId is required",
    });
  }

  const notifications = await Notification.find({ UserId }); // Corrected query

  if (notifications.length === 0) {
    // Check for empty array
    return res.status(404).json({
      success: false,
      message: "No notifications found for this user",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Notifications retrieved successfully",
    data: notifications,
  });
});

export {
  createNotification,
  updateNotificationByKey,
  deleteNotificationByKey,
  getAllNotifications,
};

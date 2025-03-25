import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    UserId: { type: String, default: "" },
    date: { type: String, default: "" },
    key: { type: String, required: true, unique: true }, // Unique identifier
    message: { type: String, default: "" },
    time: { type: String, default: "" },
    title: { type: String, default: "" },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;

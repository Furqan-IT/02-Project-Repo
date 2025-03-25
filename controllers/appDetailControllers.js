import expressAsyncHandler from "express-async-handler";
import App from "../models/appDetailModel.js";

const createAppDetails = expressAsyncHandler(async (req, res) => {
  const newAppDetail = new App(req.body);

  await newAppDetail.save();

  return res.status(201).json({
    success: true,
    message: "Configuration created successfully",
    data: newAppDetail,
  });
});

const updateAppDetailById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const appDetail = await App.findById(id);
  if (!appDetail) {
    return res
      .status(404)
      .json({ success: false, message: "Document of App Details not found" });
  }

  const updateAppDetail = await App.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "App Detail Document updated successfully",
    data: updateAppDetail,
  });
});

const deleteAppDetailById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const appDetail = await App.findById(id);
  if (!appDetail) {
    return res
      .status(404)
      .json({ success: false, message: "Requested Document not found" });
  }

  await appDetail.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Requested Document deleted successfully",
  });
});


const getAllDocsOfAppDetail = expressAsyncHandler(async (req, res) => {
  const documents = await App.find({}); // Fetch all users

  return res.status(200).json({
    success: true,
    message: "Documents retrieved successfully",
    data: documents,
  });
});





export {
  createAppDetails,
  updateAppDetailById,
  deleteAppDetailById,
  getAllDocsOfAppDetail,
};

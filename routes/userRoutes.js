import express from "express";
import {
  authUser,
  checkUser,
  deleteUser,
  getAllUsers,
  getAllUsersForAgent,
  getUserByRefCode,
  getUserByUserId,
  registerUser,
  resetUser,
  updateUser,
} from "../controllers/userControllers.js";
import {
  addTransaction,
  deleteTransaction,
  getFilteredTransactions,
  updateTransaction,
} from "../controllers/transactionControllers.js";
import {
  createBid,
  deleteBid,
  getFilteredBids,
  updateBid,
} from "../controllers/bidControllers.js";
import {
  createGame,
  deleteGame,
  getAllGameDocs,
  toggleGameOff,
  updateGame,
} from "../controllers/gameControllers.js";
import {
  createAppDetails,
  deleteAppDetailById,
  getAllDocsOfAppDetail,
  getAppDetailByKey,
  updateAppDetailById,
} from "../controllers/appDetailControllers.js";
import {
  bulkInsert,
  checkResult,
  createResult,
  deleteResultByKey,
  getAllResults,
  getAllResultsOnGameKey,
  getAllResultsOnMonth,
  updateResultByKey,
} from "../controllers/resultControllers.js";
import {
  createUserWin,
  deleteUserWinByKey,
  getFilteredUserWins,
  updateUserWinByKey,
} from "../controllers/userWinControllers.js";
import {
  createNotification,
  deleteNotificationByKey,
  getAllNotifications,
  updateNotificationByKey,
} from "../controllers/notificationControllers.js";
const router = express.Router();

//User Routes
router.route("/register").post(registerUser); //Register User
router.route("/login").post(authUser); //Login User
router.route("/checkUser").post(checkUser); // Check user by email or phone
router.route("/get-all-user").post(getAllUsers); // Get All Listed Users Array
router.route("/get-agent-user").post(getAllUsersForAgent); // Get All Listed Users Array on the basis of Agent_id
router.route("/updateUser/:userid").put(updateUser); // Update the User Model
router.route("/deleteUser/:userid").delete(deleteUser); //Delete User
router.route("/resetUser/:userid").delete(resetUser); //Delete User
router.route("/refcode/:refcode").get(getUserByRefCode);
router.route("/userid/:userid").get(getUserByUserId);

// Transaction Routes
router.route("/addTransaction").post(addTransaction);
router.route("/updateTransaction/:key").put(updateTransaction);
router.route("/deleteTransaction/:key").delete(deleteTransaction);
router.route("/getFilteredTransactions").get(getFilteredTransactions); //Send Parameters in query

//Bid Routes
router.route("/create-bid").post(createBid); // Create bid
router.route("/update-bid/:id").put(updateBid); // Update bid
router.route("/delete-bid/:id").delete(deleteBid); // Delete bid
router.route("/getFilteredBids").get(getFilteredBids); // Get Bid //Send parameterss in query

//Game Routes
router.route("/create-game").post(createGame); // Create a game
router.route("/update-game/:key").put(updateGame); // Update a game
router.route("/delete-game/:key").delete(deleteGame); // Delete a game
router.route("/get-game").get(getAllGameDocs); // Create a game
router.route("/toggleGameOff").put(toggleGameOff); // Game On Off

//App Detail Routes
router.route("/create-doc").post(createAppDetails); // Create App Details
router.route("/update-doc/:id").put(updateAppDetailById); // Update App Details by ID
router.route("/delete-doc/:id").delete(deleteAppDetailById); // Delete App Details by ID
router.route("/get-doc").get(getAllDocsOfAppDetail); // Get App Details
router.route("/get-app-detail/:key").get(getAppDetailByKey); // Get App Details

//Result Route
router.route("/create-result").post(createResult); // Create Result
router.route("/update-result/:key").put(updateResultByKey); // Update Result by key
router.route("/delete-result/:key").delete(deleteResultByKey); // Delete Result by key
router.route("/get-result").post(getAllResults); // Get Result // Send result_date in body
router.route("/get-result-game").post(getAllResultsOnGameKey); // Get Result // Send result_date in body
router.route("/get-result-month").post(getAllResultsOnMonth); // Get Result // Send result_date in body
router.route("/checkResult").get(checkResult); //Check Result // Send game_key and result_date in query
router.route("/bulk_insert").post(bulkInsert);

//User Win Routes
router.route("/create-user-win").post(createUserWin); // Create User Win
router.route("/update/user-win/:key").put(updateUserWinByKey); // Update User Win by key
router.route("/delete-user-win/:key").delete(deleteUserWinByKey); // Delete User Win by key
router.route("/getFilteredUserWins").get(getFilteredUserWins); // Get Filtered User Win

//Notification Routes

router.route("/create-notif").post(createNotification); // Create Notification
router.route("/update-notif/:key").put(updateNotificationByKey); // Update Notification by key
router.route("/delete-notif/:key").delete(deleteNotificationByKey); // Delete Notification by key
router.route("/get-notif/:UserId").get(getAllNotifications); // Create Notification

export default router;

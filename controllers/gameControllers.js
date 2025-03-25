import expressAsyncHandler from "express-async-handler";
import Game from "../models/gameModel.js";
import Result from "../models/resultModel.js";
import moment from "moment";

// Create a new game
const createGame = expressAsyncHandler(async (req, res) => {
  const {
    gameOff = false,
    sundayoff = false,
    result_show = false,
    game_hide = false,
    gante = "",
    key = "",
    minutes = "",
    name = "",
    rate = "",
    time12 = "",
    time12format = "",
    time24format = "",
    harup_rate = "",
    result_time = "",
    status = "",
    order = "",
    imagelink = "",
  } = req.body;

  const game = await Game.create({
    gameOff,
    sundayoff,
    result_show,
    game_hide,
    gante,
    key,
    minutes,
    name,
    rate,
    time12,
    time12format,
    time24format,
    harup_rate,
    result_time,
    status,
    order,
    imagelink,
  });

  if (game) {
    return res.status(201).json({
      success: true,
      message: "Game created successfully",
      status_code: 200,
      data: game,
    });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Failed to create game" });
  }
});

const updateGame = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const game = await Game.findOne({ key });
  if (!game) {
    return res
      .status(404)
      .json({ success: false, message: "Game not found with the given key" });
  }

  const updatedGame = await Game.findOneAndUpdate({ key }, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Game updated successfully",
    data: updatedGame,
  });
});

const deleteGame = expressAsyncHandler(async (req, res) => {
  const { key } = req.params;

  const game = await Game.findOne({ key });
  if (!game) {
    return res.status(404).json({ success: false, message: "Game not found" });
  }

  await game.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Game deleted successfully",
  });
});

const getAllGameDocs = expressAsyncHandler(async (req, res) => {
  try {
    const gameDocs = await Game.find({}); // Fetch all game documents
    const currentDate = moment().format("YYYY-MM-DD"); // Get current date in YYYY-MM-DD format

    // Iterate over each game document
    const updatedGameDocs = await Promise.all(
      gameDocs.map(async (game) => {
        const matchingResult = await Result.findOne({
          game_key: game.key, // Match game key with result model's game_key
          result_date: currentDate, // Match current date with result's added_date
        });

        // Add result_value if match found, otherwise leave empty
        return {
          ...game.toObject(),
          result_value: matchingResult ? matchingResult.result : "",
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Game documents retrieved successfully",
      data: updatedGameDocs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

const toggleGameOff = expressAsyncHandler(async (req, res) => {
  try {
    const { key, gameOff } = req.body; // Extract key and gameOff state

    if (typeof gameOff !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid gameOff value. It should be true or false.",
      });
    }

    // Find and update game based on the key
    const updatedGame = await Game.findOneAndUpdate(
      { key }, // Find by key
      { gameOff }, // Update gameOff
      { new: true } // Return updated document
    );

    if (!updatedGame) {
      return res.status(404).json({
        success: false,
        message: "Game not found with the provided key.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `GameOff state updated successfully to ${gameOff}`,
      data: updatedGame,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export { createGame, updateGame, deleteGame, getAllGameDocs, toggleGameOff };

const express = require("express");

const {
  addFavoriteHandler,
  deleteFavoriteHandler,
  getFavoriteHandler,
} = require("../../controllers/favorite");

const { auth } = require("../../auth/auth");

const favoriteRouter = express.Router();

favoriteRouter.get("/", getFavoriteHandler);
favoriteRouter.put("/", addFavoriteHandler);
favoriteRouter.delete("/", deleteFavoriteHandler);

module.exports = { favoriteRouter };

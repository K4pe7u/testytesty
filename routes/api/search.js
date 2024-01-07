const express = require("express");
const {
  getSearchedTitlesHandler,
  getSearchedIngredientsHandler,
} = require("../../controllers/search");
const searchRouter = express.Router();

const { auth } = require("../../auth/auth");

searchRouter.get("/title", getSearchedTitlesHandler);
searchRouter.get("/ingredient", getSearchedIngredientsHandler);

module.exports = { searchRouter };

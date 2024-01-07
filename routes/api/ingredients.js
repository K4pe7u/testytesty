const express = require("express");

const {
  getAllIngredientsHandler,
  searchByIngredient,
  getIngredientsHandler,
} = require("../../controllers/ingredients");

const auth = require("../../auth/auth");

const ingredientsRouter = express.Router();

ingredientsRouter.post("/", searchByIngredient);
ingredientsRouter.get("/list", getAllIngredientsHandler); ///// Wyłączyłem middlewera chwilkowo
ingredientsRouter.get("/get", getIngredientsHandler);

module.exports = { ingredientsRouter };

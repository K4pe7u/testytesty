const { mongoose } = require("mongoose");
const { Ingredients } = require("../models/ingredients");
const { Recipes } = require("../models/recipes");

const getAllIngredients = async () => {
  try {
    return await Ingredients.find();
  } catch (e) {
    console.error(e);
  }
};

const getRecipesByIngredient = async (ingredient) => {
  try {
    const ingredientDoc = await Ingredients.findOne({ ttl: ingredient });

    const recipes = await Recipes.find({
      "ingredients.id": new mongoose.Types.ObjectId(ingredientDoc),
    });

    return recipes;
  } catch (e) {
    console.error(e);
  }
};

const getIngredients = async (query) => {
  if (!query) {
    const search = await Ingredients.find();
    return search;
  }

  const searchedIngredient = await Ingredients.findOne({
    $text: { $search: query },
  }).select("_id");

  if (!searchedIngredient) return [];

  const ingredientId = searchedIngredient._id;

  const searchRecipes = await Recipes.find({
    ingredients: {
      $elemMatch: {
        id: ingredientId,
      },
    },
    owner: { $exists: false },
  });

  return searchRecipes;
};

module.exports = { getAllIngredients, getRecipesByIngredient, getIngredients };

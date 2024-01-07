const { Recipes } = require("../models/recipes");
const { Ingredients } = require("../models/ingredients");

const getSearchedTitles = async (query = "") => {
  try {
    const result = await Recipes.find({
      title: { $regex: query, $options: "i" },
    });

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};

const getSearchedIngredients = async (query = "") => {
  try {
    const ingredients = await Ingredients.find({
      ttl: { $regex: query, $options: "i" },
    });

    console.log("Ingredients:", ingredients);

    if (ingredients.length === 0) {
      return null;
    }

    const ingredientIds = ingredients.map((ingredient) => ingredient._id);

    const result = await Recipes.find({
      "ingredients.id": { $in: ingredientIds },
    });

    console.log("Search Result:", result);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  getSearchedTitles,
  getSearchedIngredients,
};

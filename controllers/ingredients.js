const {
  getAllIngredients,
  getIngredients,
  getRecipesByIngredient,
} = require("../db/services/ingredients");

const getAllIngredientsHandler = async (req, res) => {
  try {
    const ingredients = await getAllIngredients();
    console.log(ingredients);
    return res.status(200).json(ingredients);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error occurred." });
  }
};

const searchByIngredient = async (req, res) => {
  try {
    const { ingredient } = req.body;
    const listOfSearches = await getRecipesByIngredient(ingredient);
    if (listOfSearches === null) {
      return res.status(404).json({
        message: "We couldn't find any recipes that fit your description ;(",
      });
    }
    return res.status(200).json(listOfSearches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error occurred." });
  }
};

const getIngredientsHandler = async (req, res) => {
  try {
    const result = await getIngredients();
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error occurred." });
  }
};

module.exports = {
  getAllIngredientsHandler,
  searchByIngredient,
  getIngredients,
  getIngredientsHandler,
};

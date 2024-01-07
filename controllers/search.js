const {
  getSearchedTitles,
  getSearchedIngredients,
} = require("../db/services/search");

const getSearchedTitlesHandler = async (req, res, next) => {
  try {
    const { query } = req.query;
    const listOfSearches = await getSearchedTitles(query);

    if (listOfSearches === null) {
      return res.status(404).json({
        message: "We couldn't find any recipes that fit your description ;(",
      });
    }

    return res.status(200).json({ listOfSearches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error occurred." });
  }
};

const getSearchedIngredientsHandler = async (req, res, next) => {
  try {
    const { query } = req.query;
    const listOfSearches = await getSearchedIngredients(query);

    if (listOfSearches === null) {
      return res.status(404).json({
        message:
          "We couldn't find any recipes with the specified ingredient ;(",
      });
    }

    return res.status(200).json({ listOfSearches });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "A server error occurred." });
  }
};

module.exports = {
  getSearchedTitlesHandler,
  getSearchedIngredientsHandler,
};

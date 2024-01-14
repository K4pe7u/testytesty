const { Recipes } = require("../models/recipes");

const getPopularity = async (owner) => {
  try {
    const result = await Recipes.find({
      owner,
      popularity: { $gt: 1 },
    }).exec();

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error function:", error);
    return { error: error.message };
  }
};

module.exports = {
  getPopularity,
};

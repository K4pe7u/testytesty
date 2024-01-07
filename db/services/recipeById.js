const express = require("express");
const router = express.Router();
const { Recipes } = require("../models/recipes");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipes.findById(id).exec();

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found!" });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error!");
  }
});

module.exports = router;

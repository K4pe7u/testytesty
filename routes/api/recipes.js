const express = require("express");
const router = express.Router();
const { Recipes } = require("../../db/models/recipes");

// ////// These paths are used for the category page

router.get("/beef", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Beef" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/breakfast", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Breakfast" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/chicken", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Chicken" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/dessert", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Dessert" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/goat", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Goat" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/lamb", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Lamb" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/miscellaneous", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Miscellaneous" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/pasta", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Pasta" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/pork", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Pork" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/seafood", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Seafood" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

router.get("/side", async (req, res) => {
  try {
    const recipes = await Recipes.find({ category: "Side" })
      .select("title thumb")
      .exec();

    res.json(recipes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Błąd serwera");
  }
});

module.exports = router;

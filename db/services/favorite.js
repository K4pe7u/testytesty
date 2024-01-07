const { Recipes } = require("../models/recipes");
const { User } = require("../models/user");

const mongoose = require("mongoose");

//funkcje główne (exportowane)

const addFavorite = async (owner, id) => {
  try {
    const oldFavorites = await getFavorite(owner);
    const popularity = await incrementPopularity(id);

    if (!oldFavorites.favorites.includes(id)) {
      oldFavorites.favorites.push(id);

      const updatedUser = await updateUserFavorites(
        owner,
        oldFavorites.favorites
      );
      const updatedRecipe = await updateRecipePopularity(id, popularity);

      return updatedUser;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const getFavorite = async (owner) => {
  try {
    const result = await User.findOne({ _id: owner }, { _id: 0, favorites: 1 });
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteFavorite = async (owner, id) => {
  try {
    const oldFavorites = await getFavorite(owner);
    const popularity = await decrementPopularity(id);

    if (oldFavorites.favorites.includes(id)) {
      const newFavorites = oldFavorites.favorites.filter(
        (element) => element !== id
      );

      const updatedUser = await updateUserFavorites(owner, newFavorites);
      const updatedRecipe = await updateRecipePopularity(id, popularity);

      return updatedUser;
    }

    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

//funkcje pomocnicze
const updateUserFavorites = async (owner, favorites) => {
  return await User.findByIdAndUpdate(owner, { favorites });
}; //znalezienie i aktualizacja listy ulubionych użytkownika

const updateRecipePopularity = async (id, popularity) => {
  return await Recipes.findByIdAndUpdate(id, { popularity });
}; //znalezienie i aktualizacja wartości stopnia popularności przepisu

const getPopularity = async (id) => {
  try {
    const result = await Recipes.findOne(
      { _id: id },
      { _id: 0, popularity: 1 }
    );
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
}; // pobiera wartość popularności przepisu (potrzebne do funkcji manipulacji wartością poniżej)

const incrementPopularity = async (id) => {
  const popularity = await getPopularity(id);
  popularity.popularity = popularity.popularity ?? 1;
  popularity.popularity++;
  return popularity.popularity;
};

const decrementPopularity = async (id) => {
  const popularity = await getPopularity(id);
  popularity.popularity =
    popularity.popularity > 0 ? popularity.popularity - 1 : 0;
  return popularity.popularity;
};

module.exports = {
  addFavorite,
  getFavorite,
  deleteFavorite,
};

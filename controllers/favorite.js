const {
  addFavorite,
  deleteFavorite,
  getFavorite,
} = require("../db/services/favorite");

//ciekawe rozewiązanie odpowiedzi i błędu(funkcje pomocnicze)

const handleResponse = (res, statusCode, data) => {
  return res.status(statusCode).json(data);
};

const handleError = (res, err) => {
  console.error(err);
  return res.status(500).json({ error: "Wystąpił błąd serwera." });
};

//funkcje główne

const addFavoriteHandler = async (req, res, next) => {
  try {
    const owner = req.userId;
    const { idOfFavorite } = req.body;
    const response = await addFavorite(owner, idOfFavorite);

    if (!response) {
      return handleResponse(res, 500, { message: "Something went wrong" });
    }

    return handleResponse(res, 200, response);
  } catch (err) {
    return handleError(res, err);
  }
};

const deleteFavoriteHandler = async (req, res, next) => {
  try {
    const owner = req.userId;
    const { idOfFavorite } = req.body;
    const response = await deleteFavorite(owner, idOfFavorite);

    if (!response) {
      return handleResponse(res, 500, { message: "Something went wrong" });
    }

    return handleResponse(res, 200, response);
  } catch (err) {
    return handleError(res, err);
  }
};

const getFavoriteHandler = async (req, res, next) => {
  try {
    const owner = req.userId;
    const favoriteList = await getFavorite(owner);

    if (favoriteList.length === 0) {
      return handleResponse(res, 404, { message: "You have no favorites" });
    }

    return handleResponse(res, 200, favoriteList);
  } catch (err) {
    return handleError(res, err);
  }
};

module.exports = {
  addFavoriteHandler,
  deleteFavoriteHandler,
  getFavoriteHandler,
};

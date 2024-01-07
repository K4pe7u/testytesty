const express = require("express");
const cors = require("cors");
const passport = require("passport");
const logger = require("morgan");

const app = express();

const usersRouter = require("./routes/api/users");
const recipesRoutes = require("./routes/api/recipes");
const allrecipesRoutes = require("./db/services/recipeById");
const { ingredientsRouter } = require("./routes/api/ingredients");
const { searchRouter } = require("./routes/api/search");
const { favoriteRouter } = require("./routes/api/favorite");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use(passport.initialize());
app.use("/api/recipes", recipesRoutes);
app.use("/api/recipeById", allrecipesRoutes);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/search", searchRouter);
app.use("/api/favorite", favoriteRouter);
module.exports = app;

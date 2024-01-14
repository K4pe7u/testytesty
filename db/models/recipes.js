const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const recipeIngredientSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "ingredients",
      required: true,
    },
    measure: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const recipeSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    favorites: {
      type: Array,
      required: true,
    },
    youtube: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    ingredients: {
      type: [recipeIngredientSchema],
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Recipes = model("Recipes", recipeSchema);

module.exports = {
  Recipes,
};

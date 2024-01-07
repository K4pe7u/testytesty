const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
  {
    ttl: {
      type: String,
      required: [true, "Title is required"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
    },
    t: {
      type: String,
      default: "",
    },
    thb: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const Ingredients = model("ingredient", ingredientSchema);

module.exports = { Ingredients };

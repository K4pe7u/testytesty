const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  token: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  favorites: {
    type: Array,
    default: [],
  },
  shoppingList: {
    type: Array,
    default: [],
  },
  recipes: {
    type: Array,
    default: [],
  },
});

const User = model("User", userSchema);

module.exports = {
  User,
};

const { User } = require("../models/user");

const getUser = async (id) => {
  try {
    return await User.findById(id).select("token");
  } catch (err) {
    console.log("Error getting user token: ", err);
    throw err;
  }
};

module.exports = {
  getUser,
};

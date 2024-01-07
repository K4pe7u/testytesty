const mongoose = require("mongoose");
const { database } = require("../config");

const connect = async () => {
  try {
    await mongoose.connect(database);
    console.log("Database connection established");
  } catch (err) {
    console.error(err);
    throw new Error("Database connection filed");
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database connection disconnected");
  } catch (err) {
    console.error(err);
    throw new Error("Cannot disconnect from database");
  }
};

process.on("SIGINT", async () => {
  await disconnect();
  process.exit(0);
});

module.exports = {
  connect,
  disconnect,
};

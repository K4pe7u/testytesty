const db = require("./db/moongose");
const { port } = require("./config");
const app = require("./app");

app.listen(port, () => {
  console.log(`App working on port: ${port}`);
  db.connect().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
});

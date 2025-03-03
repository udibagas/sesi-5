const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

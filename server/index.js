const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.use(bodyParser.json());
app.use(require("./routes"));

// const mongoose = require("mongoose");
// const mlabUri = process.env.SECRET || "";
// if (!mlabUri) {
//   console.log("*************************************************************************");
//   console.error("WARNING! Set the SECRET environment variable in .env to your MLAB URI.");
//   console.log("*************************************************************************");
// }
// mongoose.connect(mlabUri);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port:${port}`); // eslint-disable-line
});

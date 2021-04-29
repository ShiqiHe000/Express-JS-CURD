const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const logger = require("./middleware/logger.js");
const apiRouter = require("./routes/api/members.js");
const members = require('./Members.js');

const app = express();

// handlebars middlewares
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(express.json()); // handle raw json
app.use(express.urlencoded({ extended: false })); // form submission

// Init middleware
// app.use(logger);

// Homepage route
app.get('/', (req, res) => {
  res.render('index', {
    title: "Member App",
    members
  })
})

// // set a static folder
// app.use(express.static(path.join(__dirname, "public")));



// members api routes
app.use("/api/members", apiRouter);

// create member

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

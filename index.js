const browserObject = require("./browser");
const scraperController = require("./pageController");

const express = require("express"); // Adding Express
const app = express(); // Initializing Express

var fs = require("fs");

app.use(express.json());

const logs = [];

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance);

// Api
const dataPath = "./data.json";
const dataPath1 = "./data1.json";

app.get("/adeel", (req, res) => {
  res.send(logs);
});

// READ
app.get("/api", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.send(data && data.length > 0 ? JSON.parse(data) : null);
  });
});
// ROOT TESTING
app.get("/", (req, res) => {
  fs.readFile(dataPath1, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.send(JSON.parse(data));
  });
});
var port = process.env.PORT || 8080;
// Making Express listen on port 7000
app.listen(port, function () {
  console.log("Running.");
});

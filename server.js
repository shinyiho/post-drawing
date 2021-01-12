const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

const upload_folder = "tmp";

app.use(cors());
app.use(bodyParser.json());
app.use("/uploaded", express.static(upload_folder));
app.use("/assets", express.static("assets"));
// // get list of posts
app.get("/", (req, res) => {
  res.send("sever running");
});
app.get("/posts", (req, res) => {
  fs.promises.readdir(upload_folder).then((files) => {
    res.send(JSON.stringify(files));
  });
});

// Upload post route
app.post("/upload", (req, res) => {
  const { image } = req.body;

  var base64Data = image.replace(/^data:image\/png;base64,/, "");

  let id = Math.random().toFixed(8).toString().slice(2);

  fs.writeFile(`${upload_folder}/${id}.png`, base64Data, "base64", (err) => console.log(err));

  res.json({ id: id });
  console.log("saved " + id);
});

// Server listener
app.listen(PORT, () => {
  console.log("app is running");
});

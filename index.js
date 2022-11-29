import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

let winStatus = 0;
let loseStatus = 0;
let drawStatus = 0;

app.use(express.static("./"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  winStatus = req.body.winStatus;
  loseStatus = req.body.loseStatus;
  drawStatus = req.body.drawStatus;
});

app.get("/getInfo", (req, res) => {
  res.json({
    winStatus: winStatus,
    loseStatus: loseStatus,
    drawStatus: drawStatus,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.get("/", (req, res) => {
  console.log(`Client is requested !`);
  res.send("Hello World!");
});

app.get("/client1", (req, res) => {
  res.sendFile(__dirname + "/client/client_1.html");
});

app.get("/client2", (req, res) => {
  res.sendFile(__dirname + "/client/client_2.html");
});

app.get("/client3", (req, res) => {
  res.sendFile(__dirname + "/client/client_3.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

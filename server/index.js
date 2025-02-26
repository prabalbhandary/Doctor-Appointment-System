import express from "express";
import "colors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const mode = process.env.NODE_MODE || "production";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on ${mode} mode at http://localhost:${port}`.bgCyan.white);
});
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cors from "cors";

dotenv.config();

const app = express();

// using middlewares
app.use(express.json());

const corsOptions = {
  origin: 'https://placeprep.vercel.app',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/uploads", express.static("uploads"));

// importing routes
import userRoutes from "./routes/user.js";
import ResourceRoutes from "./routes/Resource.js";
import adminRoutes from "./routes/admin.js";

// using routes
app.use("/api", userRoutes);
app.use("/api", ResourceRoutes);
app.use("/api", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});

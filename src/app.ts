import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database";
import passport from "./config/passport";
import authRoutes from "./routes/authRoutes";
import googleAuthRouters from "./routes/googleAuthRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", googleAuthRouters);


// Database connection and server start
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

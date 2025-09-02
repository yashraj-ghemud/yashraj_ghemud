require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV;

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);







const allowedOrigins = [
  "http://localhost:3000",                               // your React dev server
  "https://yashraj-ghemud.github.io/yashraj-JSRG"      // your GitHub Pages site
];
app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error(`CORS policy forbids access from origin ${origin}`)
      );
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);











app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (_req, res) =>
  res.json({ message: "Hello from Express", env: process.env.NODE_ENV })
);

// MongoDB connect & start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✅ MongoDB Connected`);
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
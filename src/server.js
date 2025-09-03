// src/server.js
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_DEV || process.env.MONGO_URI;

// -------- Middlewares --------
// small security headers
app.use(helmet());
app.use(morgan("dev"));

// allow JSON body
app.use(express.json());

// CORS configuration
// whitelist origins you use (add/remove as needed)
const allowedOrigins = [
  "http://localhost:3000",                 // local dev
  "https://yashraj-ghemud.github.io",      // GitHub Pages root
  "https://yashraj-ghemud.github.io/yashraj-JSRG", // optional repo path origin
  "https://your-other-domain-if-any.com"
];

// Dynamic CORS headers and preflight handling
app.use((req, res, next) => {
  const origin = req.get("Origin");
  if (!origin) {
    // No origin (curl, server-to-server) -> allow
    res.header("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    // allowed origin -> echo it back
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // not in whitelist -> do not set Access-Control-Allow-Origin (browser will block)
    // You could also choose to deny explicitly with an error.
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

  // handle preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// (Optional) also keep cors() for express convenience (not strictly required now)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // return callback(new Error("Not allowed by CORS"));
      return callback(null, false); // js will not set CORS header for disallowed
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// -------- Routes (register after CORS middleware) --------
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// root endpoints
app.get("/", (_req, res) =>
  res.json({ message: "Hello from Express backend", env: process.env.NODE_ENV })
);

app.get("/api", (_req, res) =>
  res.json({ message: "Hello from Express backend API" })
);

// -------- Connect & start --------
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

// Routes
const authRoutes = require("./routes/auth.route");
const favoriteRoutes = require("./routes/favorite.route");
const historyRoutes = require("./routes/history.route");
const adminMovieRoutes = require("./routes/adminMovie.route");
const adminUserRoutes = require("./routes/adminUser.route");
const movieRoutes = require("./routes/movie.route");

app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/admin/movies", adminMovieRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/movies", movieRoutes);


// Serve frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});

module.exports = app;
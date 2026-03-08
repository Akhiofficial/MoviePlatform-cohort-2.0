const mongoose = require("mongoose");

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected To DB");
        })
        .catch((err) => {
            console.error("DB Connection Error:", err.message);
        })
}

module.exports = connectToDb;
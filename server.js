require("dotenv").config(); // Load .env variables first

const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
const app = require("./app"); // Express app

const PORT = process.env.SERVER_PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Connect to MongoDB
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("✅ [MongoDB] Connected successfully:", dbConfig.url);
    })
    .catch((err) => {
        console.error("❌ [MongoDB] Connection failed:", err.message);
        process.exit(1);
    });

// Start Express Server
app.listen(PORT, () => {
    console.log("🚀 [Express] Server is running:");
    console.log(`   ➤ URL:        http://localhost:${PORT}`);
    console.log(`   ➤ Environment: ${NODE_ENV}`);
    console.log(`   ➤ MongoDB:     ${dbConfig.url}`);
});

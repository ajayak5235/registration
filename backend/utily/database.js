const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database is Connected")
    } catch (error) {
        console.error(`Error in Database Connection `)
    }
}

module.exports = connectDB;
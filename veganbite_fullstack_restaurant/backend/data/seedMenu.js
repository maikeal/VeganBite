require("dotenv").config();
const connectDB = require("../config/db");
const MenuItem = require("../models/MenuItem");
const menuItems = require("./menuItems");

const seedMenu = async () => {
  try {
    await connectDB();
    await MenuItem.deleteMany();
    await MenuItem.insertMany(menuItems);
    console.log("Menu data seeded successfully.");
    process.exit();
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedMenu();

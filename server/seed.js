// Run once to create the first admin account: node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "admin@example.com";
  const existing = await User.findOne({ email });

  if (existing) {
    console.log("Admin user already exists:", email);
  } else {
    await User.create({
      name: "Admin",
      email,
      password: "Admin@123", // change this after first login
      role: "admin",
    });
    console.log("Admin user created:");
    console.log("  email:    admin@example.com");
    console.log("  password: Admin@123");
    console.log("Change this password after logging in for the first time.");
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    bookings: [
      {
        checkInDate: { type: Date },
        checkOutDate: { type: Date },
        price: String,
        city: String,
        hotelType: String,
      },
    ],
  },
  {
    collection: "user-data",
  }
);

const User = mongoose.model("user-data", userSchema);

module.exports = User;

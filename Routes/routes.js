const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// Register API
router.post("/register", controller.registerUser);

// Login API
router.post("/login", controller.loginUser);

// Profile API
router.get("/profile", controller.authenticateToken, controller.getProfile);

// Bookings
router.post("/book-room", controller.authenticateToken, controller.bookRoom);
router.get("/bookings", controller.authenticateToken, controller.getBookings);
router.delete(
  "/bookings/:bookingId",
  controller.authenticateToken,
  controller.deleteBooking
);

module.exports = router;

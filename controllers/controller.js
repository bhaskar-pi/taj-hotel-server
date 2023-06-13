const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register API
const registerUser = async (request, response) => {
  const { username, email, password, confirmPassword } = request.body;
  try {
    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existedUser = await User.findOne({ email });

      if (!existedUser) {
        await User.create({
          username,
          email,
          password: hashedPassword,
          confirmPassword: hashedPassword,
        });

        return response.status(200).send("User registered successfully");
      } else {
        return response.status(400).send("User with this email already exists");
      }
    } else {
      console.log("400");
      return response.status(400).send("Password Mismatched");
    }
  } catch (error) {
    response.status(500).send("Server Error");
  }
};

// Login API
const loginUser = async (request, response) => {
  const { email, password } = request.body;

  const existedUser = await User.findOne({ email });
  try {
    if (!existedUser) {
      return response.status(400).send("User not existed");
    } else {
      const isPasswordMatched = await bcrypt.compare(
        password,
        existedUser.password
      );
      if (isPasswordMatched) {
        const payload = {
          id: existedUser.id,
        };

        jwt.sign(payload, "bhaskar", (err, token) => {
          if (err) throw err;
          return response.json({ token });
        });
      } else {
        return response.status(400).send("Incorrect Password");
      }
    }
  } catch (error) {
    return response.status(500).send("Server Error");
  }
};

// AuthenticationToken
const authenticateToken = (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, "bhaskar", async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        request.id = payload.id;
        next();
      }
    });
  }
};

// Profile API
const getProfile = async (request, response) => {
  try {
    let existId = await User.findById(request.id);
    console.log(existId);
    if (!existId) {
      return response.status(400).send("user not exits");
    }
    return response.json(existId);
  } catch (error) {
    console.log(error);
    return response.status(400).send("server error");
  }
};

// Bookings
const bookRoom = async (request, response) => {
  try {
    const { checkInDate, checkOutDate, price, city, hotelType } = request.body;
    console.log(request.body);
    const userId = request.id;
    const formattedCheckInDate = new Date(checkInDate);
    const formattedCheckOutDate = new Date(checkOutDate);

    // Save the booking data to the user's document in the database

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          bookings: {
            checkInDate: formattedCheckInDate,
            checkOutDate: formattedCheckOutDate,
            price,
            city,
            hotelType,
          },
        },
      },
      { new: true }
    );

    return response.status(200).send("Booking saved successfully");
  } catch (error) {
    console.log(error);
    return response.status(500).send("Server Error");
  }
};

const getBookings = async (request, response) => {
  try {
    let existId = await User.findById(request.id);
    console.log(existId);
    if (!existId) {
      return response.status(400).send("user not exits");
    }
    return response.json(existId.bookings);
  } catch (error) {
    console.log(error);
    return response.status(400).send("server error");
  }
};

const deleteBooking = async (request, response) => {
  try {
    const userId = request.id;
    const bookingId = request.params.bookingId;

    // Find the user and remove the booking by its ID
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { bookings: { _id: bookingId } },
      },
      { new: true }
    );

    // Get the canceled booking from the user object
    const canceledBooking = user.bookings.find(
      (booking) => booking._id.toString() === bookingId
    );

    return response.json(canceledBooking);
  } catch (error) {
    console.log(error);
    return response.status(500).send("Server Error");
  }
};

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
  getProfile,
  bookRoom,
  getBookings,
  deleteBooking,
};

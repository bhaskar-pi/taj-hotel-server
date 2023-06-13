# Hotel Room Booking Web App - Backend

#### [for client repo go this](https://github.com/babu-x/taj-hotel-client)

The backend folder of the Hotel Room Booking Web App contains the server-side code responsible for handling requests, managing data, and implementing the business logic of the application.

## Technologies Used

- Node.js: A JavaScript runtime environment used to execute server-side code.
- Express.js: A web application framework for Node.js used to build the RESTful API endpoints.
- MongoDB: A NoSQL database used to store and manage hotel room data, user information, and bookings.
- Mongoose: A MongoDB object modeling tool used to interact with the database.
- JSON Web Tokens (JWT): A standard for securely transmitting information between parties as a JSON object.
- CORS: A middleware used to enable Cross-Origin Resource Sharing.

## Folder Structure

The backend folder follows a standard structure, as outlined below:

- `controllers/`: Contains the controller functions responsible for handling API requests and implementing the business logic.
- `schema/`: Defines the Mongoose models for the database collections.
- `Routes/`: Contains the route handlers that define the API endpoints and their corresponding controller functions.
- `.env`: Stores configuration variables, such as database connection details and secret keys.
- `index.js`: The main entry point of the backend application.

## Installation

1. Clone the backend repository.
2. Install the required dependencies using a package manager of npm i.e - `npm install`.
3. Start the backend server using `nodemon index.js`.

## Contributing

Contributions to the backend of the Hotel Room Booking Web App are welcome. Before making any significant changes, please open an issue to discuss the proposed changes and ensure they align with the project's goals.

# Wanderlust

Wanderlust is a full-stack web application inspired by Airbnb. It is a marketplace platform where users can publish listings for vacation rentals, view exact locations on an interactive map, post reviews, and manage their bookings.

## Features

- **Listings:** Create, edit, and delete listings.
- **Reviews:** Add reviews and ratings.
- **Map:** Interactive maps to show locations.
- **Search:** Search by destination or category.
- **Uploads:** Image upload functionality.
- **Security:** Secure login and signup.

## Tech Stack

- **Frontend:** HTML, CSS, Bootstrap, EJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **APIs:** MapTiler, Cloudinary

## Installation

1. **Clone the repository**
   Download the code to your local machine.

2. **Install Dependencies**
   Run the command: npm install

3. **Setup Environment Variables**
Create a `.env` file in the root folder and add your API keys (Cloudinary, MapTiler, MongoDB URL, and Secret).

4. **Initialize Database**
Run the script to seed the database: node init/index.js

5. **Run the App**
Start the server: node app.js

6. **View in Browser**
Open: `http://localhost:8080`

## Author

Thushar Shetty

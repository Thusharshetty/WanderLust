#  WanderLust — Full Stack Vacation Rental Platform

A full-stack web application inspired by Airbnb, where users can publish vacation rental listings, explore locations on an interactive map, post reviews, and manage their bookings securely.

 **Live Demo:** [Live Demo](https://wanderlust-thushar.onrender.com/) &nbsp;|&nbsp; **GitHub:** [Thusharshetty/WanderLust](https://github.com/Thusharshetty/WanderLust)

---

##  Screenshots

> Home — Browse vacation rental listings

![Home] (<img width="1918" height="1036" alt="Screenshot 2026-02-25 212450" src="https://github.com/user-attachments/assets/b60578e5-fef4-4495-83f7-b6f7ee47bb9a" />
)

> Listing Detail — Interactive map, reviews, and booking

![Listing] (<img width="1918" height="891" alt="Screenshot 2026-02-25 213030" src="https://github.com/user-attachments/assets/16e2123d-c0ab-4f3e-802c-191c27406023" />
)

---

##  Features

-  **Listings** — Create, edit, and delete vacation rental listings
-  **Reviews** — Add reviews and star ratings on listings
-  **Interactive Map** — View exact listing locations using MapTiler API
-  **Search** — Search listings by destination or category
-  **Image Upload** — Upload listing photos via Cloudinary
-  **Authentication** — Secure signup and login with session management
-  **Authorization** — Only listing owners can edit or delete their listings
-  **Responsive Design** — Works across desktop, tablet, and mobile

---

##  Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### APIs & Cloud
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![MapTiler](https://img.shields.io/badge/MapTiler-Maps-green?style=for-the-badge)

---

##  Project Structure

```
WanderLust/
├── controllers/        # Route handler logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/              # EJS templates
│   ├── listings/
│   ├── users/
│   └── layouts/
├── public/             # Static files (CSS, JS, images)
├── init/               # Database seed script
│   └── index.js
├── middleware.js        # Auth & validation middleware
├── cloudConfig.js      # Cloudinary configuration
├── app.js              # Main Express app
└── .env                # Environment variables (not committed)
```

---

##  Getting Started (Local Setup)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- MapTiler API key

### 1. Clone the Repository
```bash
git clone https://github.com/Thusharshetty/WanderLust.git
cd WanderLust
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root folder:
```env
MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_maptiler_api_key
SECRET=your_session_secret_key
```

### 4. Initialize Database
```bash
node init/index.js
```

### 5. Run the App
```bash
node app.js
```

### 6. View in Browser
```
http://localhost:8080
```

---

##  API & Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | View all listings |
| POST | `/listings` | Create a new listing |
| GET | `/listings/:id` | View a single listing |
| PUT | `/listings/:id` | Edit a listing |
| DELETE | `/listings/:id` | Delete a listing |
| POST | `/listings/:id/reviews` | Add a review |
| DELETE | `/listings/:id/reviews/:rid` | Delete a review |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/signup` | Signup page |
| POST | `/signup` | Register user |
| GET | `/logout` | Logout user |

---

##  Deployment

| Service | Platform |
|---------|----------|
| Backend + Frontend | https://wanderlust-thushar.onrender.com/ |
| Image Storage | Cloudinary |
| Database | MongoDB Atlas |
| Maps | MapTiler API |

---

##  Author

**Thushar Shetty**
- B.Tech Computer Science, Canara Engineering College (2027)
- GitHub: [@Thusharshetty](https://github.com/Thusharshetty)
- LinkedIn: [thushar-shetty](https://www.linkedin.com/in/thushar-shetty-8ab1802a2/)

---

##  License

This project is for educational purposes only.
Inspired by Airbnb — not affiliated with or endorsed by Airbnb Inc.

© 2026 Thushar Shetty

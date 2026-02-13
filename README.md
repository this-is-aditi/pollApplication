 Voting / Poll Application

A full-stack voting application that allows users to register, create polls, and vote securely.
Built using the MERN ecosystem (MongoDB, Express, React, Node.js).

---

Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

Database

* MongoDB (Mongoose)

---

 Features

* User Signup & Login (JWT Auth)
* Create Polls
* View Poll Listings
* Vote on Poll Options
* Secure vote handling
* REST API architecture
* Modular folder structure



Project Structure

```
poll-app/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── db/
│   └── server.js
│
├── frontend/
│   └── VotingApp/
│       ├── src/
│       │   ├── pages/
│       │   ├── api/
│       │   └── App.jsx
│
└── README.md
```

---

 Setup Instructions

 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd poll-app
```

---

 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env`

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret
PORT=3000
```

Run server:

```
npm run dev
```

---

3️⃣ Frontend Setup

```
cd ../frontend/VotingApp
npm install
npm run dev
```

---

 Authentication Flow

* Passwords hashed using bcrypt
* JWT token generated on login
* Token stored in frontend
* Protected routes validated on backend

---

 Learning Outcomes

* REST API design
* Authentication implementation
* MongoDB schema modeling
* React routing & API integration
* Full-stack project structuring

---

 Future Improvements

* Poll analytics / charts
* Real-time voting updates
* Poll closing timers
* UI/UX enhancements
* Deployment (Render + Vercel)

---

 Author

Aditi Singh

Feel free to connect or reach out!

---

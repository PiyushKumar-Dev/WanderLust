# Wanderlust 🌍

Wanderlust is a full-featured, Airbnb-style accommodation listing platform. Users can browse listings, create their own listings, leave ratings and reviews, and register/login with secure session-based authentication.

The application is fully containerized with **Docker** and prepared for cloud production environments (such as Render, Railway, or Fly.io).

---

## ✨ Features

- **User Authentication**: Secure signup, login, and logout using `passport.js` and `passport-local-mongoose`.
- **CRUD Operations**: Complete control to create, read, update, and delete listings.
- **Reviews & Ratings**: Review system for users to rate and comment on listings.
- **Form Validation**: Strict schema validation using `Joi` on both client and server sides.
- **Production Session Persistence**: Persisted user sessions in MongoDB using `connect-mongo` to prevent session loss on server restarts.
- **Containerized Stack**: Complete Docker configuration including `Dockerfile` and `docker-compose.yml` for local multi-container orchestration.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS, Bootstrap, EJS (Embedded JavaScript templates with `ejs-mate`)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose ODM)
- **Security & Auth**: Passport.js
- **DevOps**: Docker, Docker Compose

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following variables (refer to `.env.example` for details):

```env
PORT=8080
NODE_ENV=development
MONGO_URL=mongodb://127.0.0.1:27017/wanderlust
SESSION_SECRET=your_super_secret_session_signing_key
```

---

## 🚀 Getting Started

You can run Wanderlust locally either through Docker (recommended) or directly using Node.js.

### Method 1: Using Docker Compose (Recommended)
This method spins up both the Wanderlust app and a local MongoDB instance in separate, networked containers.

1. **Start the application**:
   ```bash
   docker compose up -d
   ```
2. **Initialize the database with seed listings**:
   ```bash
   docker compose exec web node init/index.js
   ```
3. **Access the application** at `http://localhost:8080`.
4. **Stop the containers**:
   ```bash
   docker compose down
   ```

### Method 2: Manual Installation (Local Node.js)
Ensure you have Node.js and a local MongoDB instance running on your machine.

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Seed the database**:
   ```bash
   node init/index.js
   ```
3. **Start the application**:
   ```bash
   npm start
   ```
4. **Access the application** at `http://localhost:8080`.

---

## 🌐 Production Deployment (e.g., Render)

To deploy Wanderlust to **Render**:
1. Connect your GitHub repository to Render as a **Web Service**.
2. Select **Docker** as the Runtime.
3. In the **Environment Variables** tab, add:
   - `MONGO_URL` (Your MongoDB Atlas connection string)
   - `SESSION_SECRET` (A strong random string)
   - `NODE_ENV` = `production`
4. Click **Deploy Web Service**.

---

## 📂 Project Structure

```
├── init/              # Database seeding scripts & mock data
├── models/            # Mongoose schemas & models (Listing, Review, User)
├── public/            # Static assets (CSS, JS, Images)
├── routes/            # Express routes (listing, review, user)
├── utils/             # Error handling wrappers & classes
├── views/             # EJS templates (Boilerplates, index, show, edit)
├── app.js             # Main server entrypoint
├── Dockerfile         # Docker build recipe
├── docker-compose.yml # Docker multi-container orchestration configuration
└── package.json       # App manifests & dependencies
```

---

## 📄 License

This project is licensed under the ISC License.

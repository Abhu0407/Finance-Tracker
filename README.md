# Finance-Tracker

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

---

## Backend Setup

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create a `.env` file in the `backend` directory with the following variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173
   PORT=5000
   ```
   - Replace `your_mongodb_connection_string` with your actual MongoDB URI.
   - You can change `CLIENT_URL` and `PORT` if needed.

4. **Start the backend server:**
   ```sh
   npm start
   ```
   - Or, for development with auto-reload:
   ```sh
   npm run dev
   ```
   - The backend will run on `http://localhost:5000` by default.

---

## Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```sh
   cd frontend/finance-tracker
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the frontend development server:**
   ```sh
   npm run dev
   ```
   - The frontend will run on `http://localhost:5173` by default.

---

## Accessing the App
- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- The frontend will communicate with the backend API.

---

## Notes
- Ensure MongoDB is running and accessible.
- If you change backend or frontend ports, update the corresponding `CLIENT_URL` and API URLs in the code/configuration.
- For production, build the frontend with `npm run build` and serve it with your preferred static file server.

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';


import authRoutes from './routes/auth.route.js';
import incomeRoutes from './routes/income.route.js';
import expenseRoutes from './routes/expense.route.js';
import dashboardRoutes from './routes/dashboard.route.js';

import { connectDB } from './lib/db.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Middleware to handle CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));



app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/finance-tracker/dist")));
    
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/finance-tracker", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log("Server started at http://localHost:" + PORT);
    connectDB();
});

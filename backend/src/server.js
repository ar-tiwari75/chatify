import express from "express"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import { ENV } from "./lib/env.js";

const app = express();

const PORT = ENV.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies -> req.body

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
})
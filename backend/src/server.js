import express from "express"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";


const app = express();

const PORT = ENV.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies -> req.body
app.use(cookieParser()); // Middleware to parse cookies -> req.cookies

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
})
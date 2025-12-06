import express from "express"
import connectDB from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // Middleware to parse JSON bodies -> req.body
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))
app.use(cookieParser()); // Middleware to parse cookies -> req.cookies

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    connectDB();
})
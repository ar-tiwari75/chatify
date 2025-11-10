import mongoose from "mongoose"

const connectDB = async () => {
    try {
		const { MONGO_URI } = process.env;
		if(!MONGO_URI) throw new Error('MONGO_URI not set in .env file');
		
        const conn = await mongoose.connect(MONGO_URI)
        console.log('MongoDB Connected:', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // 1 status code means failure, 0 means success
    }
}

export default connectDB;
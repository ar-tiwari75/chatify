import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { sender } from "../lib/resend.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');
        
        res.status(200).json(filteredUsers);
    } catch(error) {
        console.log("Error in getAllContacts:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user._id;
        const { id: userToChatId } = req.params;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                {senderId: userToChatId, receiverId: myId } 
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log('Error in getMessagesByUserId:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if(!text && !image) {
            return res.status(400).json({ message: 'Message text or image is required' });
        }

        if(senderId.equals(receiverId)) {
            return res.status(400).json({ message: 'You cannot send message to yourself' });
        }

        let imageUrl;
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        await newMessage.save();

        //todo: send message in real-time if user is online - via socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log('Error in sendMessage:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // find all the messages where logged-in user is either sender or receiver 
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId } 
            ],
        });
        // extract unique user IDs of chatr partners
        const chatPartnerIds = [...new Set(messages.map(
            msg => msg.senderId.toString() === loggedInUserIdtoString() ? msg.receiverIdtoString() : msg.senderIdtoString()
        ))];

        const chatPartners = await User.find({
            _id: { $in: chatPartnerIds }
        }).select('-password');

        res.status(200).json(chatPartners);

    } catch (error) {
        console.log('Error in getChatPartners:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
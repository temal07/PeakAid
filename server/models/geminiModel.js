import mongoose from "mongoose";

const geminiSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const GeminiResponse = mongoose.model('Response', geminiSchema);

export default GeminiResponse;

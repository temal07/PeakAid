import mongoose from "mongoose";

const geminiSchema = new mongoose.Schema({
    response: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const GeminiResponse = mongoose.model('Response', geminiSchema);

export default GeminiResponse;

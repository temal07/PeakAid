import mongoose from "mongoose";

const healthInfoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    waterInformation: {
        type: Number,
        required: true,
    },
    foodInformation: {
        type: String,
        required: true,
        calories: {
            type: Number,
            required: true,
        }
    },
    activityInformation: {
        type: String,
        required: true,
    }
});

const Health = new mongoose.model('Health', healthInfoSchema);

export default Health;
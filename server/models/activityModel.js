import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        activity: {
            type: String,
            required: true,
        }, 
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
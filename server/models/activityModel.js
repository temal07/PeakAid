import mongoose from "mongoose"

const activitySchema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        activity: {
            name: {
                type: String, 
                required: true,
            },
            caloriesBurnt : {
                type: Number,
                required: true,
            }, 
            category: {
                type: String,
                default: 'uncategorised',
            },
        }, 
    },
    {
        timestamps: true,
    }
);

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
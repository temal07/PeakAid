import mongoose from 'mongoose';

// Creates a food schema that will store the following: 
    // the user's id 
    // the food itself, its calories and name
const foodSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    food: {
        name: {
            type: String,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
            default: 0
        }
    },
}, {timestamps: true});

// Assigns the schema to a constant variable called Food
// Gives a name that is going to be displayed in the database
const Food = mongoose.model('Food', foodSchema);

// Exports the schema so that it can be used in the controller.
export default Food;

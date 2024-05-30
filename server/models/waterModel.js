import mongoose from 'mongoose';

// Creates a new Water schema in which the water amounts
// will be stored.

const waterSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    waterAmount: {
        type: Number,
        required: true,
        default: 0,
    },
}, {timestamps: true});

// Assigns a Water variable and sets it to the schema
// Gives it a name that will be displayed in the database.
const Water = mongoose.model('Water', waterSchema);

// Exports the schema so that it can be used in the controller.
export default Water;
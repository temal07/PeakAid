// This controller fully operates the CRUD of food information
// CRUD: Create, Read, Update, Delete (or Destroy)
import { errorHandler } from "../utils/errorHandler.js";
import Food from "../models/foodModel.js";

// the function gets the food data that is stored in MongoDB
export const getFood = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Build the query object
        const query = {};

        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        if (req.query.foodId) {
            query._id = req.query.foodId;
        }

        if (req.query.searchTerm) {
            query.$or = [
                { name: { $regex: req.query.searchTerm, $options: 'i' } },
                { calories: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const foods = await Food.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalFoods = await Food.countDocuments(query);
        console.log({ foods, totalFoods })

        res.status(200).json({ foods, totalFoods });
    } catch (error) {
        // if an error occurs, provides the error in a more detailed way.
        next(errorHandler(error.statusCode, error.message));        
    }
}

export const addFood = async (req, res, next) => {
    // Gets the user's id and assigns it to a variable called userId
    const userId = req.user.id;
    // Gets the food data that is coming from the body of the request
    const { name, calories } = req.body;

    // Returns a 404 error if there is no information in req.body
    if (!name || !calories) {
        return next(errorHandler(400, 'Please provide name & calorie info!'));
    }

    // if the logged-in user's id doesn't match with the id in the param,
    // sends a 403 response (Forbidden) 
    if (userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to add any food...'));
    }
    // If all of the conditions are met, the following code is executed 
    // that saves the food information in a variable called newFood
    try {
        // Adds the food info along with the userId
        const newFood = new Food({
            userId,
            food: {
                name,
                calories,
            },
        });
        // Saves the information inside the DB
        await newFood.save();
        
        // Sends back the response in a JSON format with a status code of 201.
        res.status(201).json(newFood);
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message));
    }
}

export const updateFood = async (req, res, next) => {
    // Gets the user's id
    const userId = req.user.id;

    // if the logged-in user's id doesn't match with the id in the param,
    // sends a 403 response (Forbidden) 
    if (userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this food...'));
    }
    
    // Assigns a new variable called food and sets it to the food's id
    const food = await Food.findById(req.params.foodId);

    // if the food is not found, sends a 404 error
    if (!food) {
        return next(errorHandler(404, 'Food not found'));
    }

    // if all of the conditions are met, server will attempt 
    // to update the food info by using a try-catch block

    try {
        // Creates a variable that will store the updates
        // of the food information.
        const foodToUpdate = await Food.findByIdAndUpdate(
            req.params.foodId, 
            {
                $set: {
                    'food.name': req.body.name,
                    'food.calories': req.body.calories,
                }
            }, 
            { new: true }
        );
        // sends the updated food information back in a JSON format
        // with a status code of 200 (OK)
        res.status(200).json(foodToUpdate);
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message));
    }
}

export const deleteFood = async (req, res, next) => {
    // Gets the user's id
    const userId = req.user.id

    // Checks if the logged-in user's id matches with
    // the one that's in the params
    if (userId !== req.user.id) {
        return next(errorHandler(403, "You are not allowed to delete this person's food..."));
    }
    // Finds the food's id
    const food = await Food.findById(req.params.foodId);
    // if the food doesn't exist, sends a 404 error
    if (!food) {
        return next(errorHandler(404, 'Food not found...'));
    }

    // if all of the conditions are met, the server
    // will execute the following code that finds and deletes
    // the food

    try {
        // Finds the food by its id and deletes it from the database;
        await Food.findByIdAndDelete(req.params.foodId);
        // Gets the food information
        const food = await Food.find({ userId });
        res.status(200).json({
            message: 'The food has successfully been deleted.',
            food,
        })
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message));
    }
}

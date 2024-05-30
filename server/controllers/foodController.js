// This controller fully operates the CRUD of food information
// CRUD: Create, Read, Update, Delete (or Destroy)
import { errorHandler } from "../utils/errorHandler.js";
import Food from "../models/foodModel.js";

// the function gets the food data that is stored in MongoDB
export const getFood = async (req, res, next) => {
    // gets the user's id and assigns it to a new variable
    // called userId
    const userId = req.user.id;

    // Checks if the userId (the user that's logged in) is 
    // equal to the one in the parameters (see the related route for additional information)
    if (userId !== req.params.userId) {
        // If they're not equal, the server sends a 403 response
        // and does not allow the logged in user to access the information
        return next(errorHandler(
            403, 
            `You are not allowed to 
            access this person's food
            information...
        `));
    }
    // If they are equal, the server fetches the data through a try-catch block
    try {
        // gets the food information of the user and assigns it to
        // a variable called food
        const food = await Food.find({ userId });
        // Note: food variable comes in an array form

        // checks if there's no data:
        if (food.length === 0) {
            return next(errorHandler(404, `No food info found.`));
        }
        // Logs the data for testing purposes: 
        console.log(food);

        // sends back the data in a JSON form with a 200 response (OK)
        res.status(200).json(food);
    } catch (error) {
        // if an error occurs, provides the error in a more detailed way.
        next(errorHandler(error.statusCode, error.message));        
    }
}

export const addFood = async (req, res, next) => {
    // Gets the user's id and assigns it to a variable called userId
    const userId = req.user.id;
    // Gets the food data that is coming from the body of the request
    const { food } = req.body;

    // Returns a 404 error if there is no information in req.body
    if (!food) {
        return next(errorHandler(400, 'Please provide food info!'));
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
            food,
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
                    'food.name': req.body.food.name,
                    'food.calories': req.body.food.calories,
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

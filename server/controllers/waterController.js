// This controller manages the CRUD of water information
// CRUD: Create, Read, Update, Delete (or Destroy)
import { errorHandler } from "../utils/errorHandler.js";
import Water from "../models/waterModel.js";

// the function gets the water data that is stored in MongoDB
export const getWater = async (req, res, next) => {
    // If they are equal, the server fetches the data through a try-catch block
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Build the query object
        const query = {};

        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        if (req.query.waterId) {
            query._id = req.query.waterId;
        }

        if (req.query.searchTerm) {
            query.$or = [
                { waterAmount: { $regex: req.query.searchTerm, $options: 'i' } },
            ];
        }

        const waterAmounts = await Water.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalWater = await Water.countDocuments(query);

        if (waterAmounts.length === 0 && !req.query.waterId) {
            // If no water records found and no specific waterId provided, create default water info
            const defaultWaterInfo = {
                userId: req.query.userId,
                waterAmount: 0,
                maximumAmount: 20,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            // Create default water info
            const defaultWater = new Water(defaultWaterInfo);
            await defaultWater.save();

            waterAmounts = [defaultWaterInfo];
            totalWater = 1;
        }

        console.log({ waterAmounts, totalWater });

        res.status(200).json({ waterAmounts, totalWater });
    } catch (error) {
        // if an error occurs, provides the error in a more detailed way.
        next(errorHandler(error.statusCode, error.message));        
    }
}

export const getSingleWater = async (req, res, next) => {
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
            access this person's water
            information...
        `));
    }
    try {
        // If all of the conditions are met, the following code will be executed:
        const singleWater = await Water.findById(req.params.waterId);
    
        res.json(singleWater);
    } catch (error) {
        // if an error occurs, provides the error in a more detailed way.
        next(errorHandler(error.statusCode, error.message));
    }
}

export const addWater = async (req, res, next) => {
    // Gets the user's id and assigns it to a variable called userId;
    const userId = req.user.id;
    // Gets the amount of water from the body
    const { waterAmount } = req.body;

    // Checks if the userId (the user that's logged in) is 
    // equal to the one in the parameters (see the related route for additional information)
    if (userId !== req.params.userId) {
        // If they're not equal, the server sends a 403 response
        // and does not allow the logged in user to access the information
        return next(errorHandler(
            403, 
            `You are not allowed to 
            access this person's water
            information...
        `));
    } 
    // Checks if there's any information coming from the body;
    if (!waterAmount) {
        // if there is no information, the server sends a 404 response,
        // warning the user that they must put water amount.
        return next(errorHandler(404, 'Please provide the amount of water'));
    }

    // if the ids are equal and the water information is provided,
    // the following code will be executed that 
    // is responsible for adding the water information.
    try {
        // Stores the new water information along with the 
        // user's id
        const newWater = new Water({
            userId,
            waterAmount,
            maximumAmount: 20,
        });

        if (newWater.waterAmount > 20) {
            return next(errorHandler(400, 'The limit has been reached...'));            
        }

        // First awaits, then saves the water information
        // (because the server must await for a response to come out)
        await newWater.save();

        // Finally, sends the response in a JSON format with a 201 response (Created)
        res.status(201).json(newWater);
    } catch (error) {
        // Handles any possible errors that may occur.
        next(errorHandler(error.statusCode, error.message));       
    }
}

export const addWaterAmount = async (req, res, next) => {
    // Gets the user's id
    const userId = req.user.id;

    // Gets the water amount that should be added
    const { waterAmount } = req.body;
    
    if (userId !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this person's water amount"))
    }
    // Tries to find the water information
    const water = await Water.findById(req.params.waterId);

    // if cannot be found, the server returns a 404 error.
    if (!water) {
        return next(errorHandler(404, 'Water information not found'));
    }
    
    try {
        console.log(`Current water amount: ${water.waterAmount}`);
        console.log(`Water amount to add: ${waterAmount}`);
        console.log(`Maximum water amount: ${water.maximumAmount}`);

        // Calculate the new water amount
        const newWaterAmount = water.waterAmount + waterAmount;

        // Before saving, if the new water amount exceeds the maximum amount, the server gives an error.
        if (newWaterAmount > water.maximumAmount) {
            return next(errorHandler(400, 'Limit has been reached'));
        }

        // Update the water amount
        water.waterAmount = newWaterAmount;

        // Saves the updated water info
        await water.save();
        console.log(`Updated water amount: ${water.waterAmount}`);

        res.status(200).json({
            message: `Amount for water id ${water._id} has successfully been updated`,
            water,
        });
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const deleteWaterAmount = async (req, res, next) => {
    // Gets the user's id
    const userId = req.user.id;

    const { waterAmount } = req.body;
    
    if (userId !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update this person's water amount"))
    }
    // Tries to find the water information
    const water = await Water.findById(req.params.waterId);

    // if cannot be found, the server returns a 404 error.
    if (!water) {
        return next(errorHandler(404, 'Water information not found'));
    }

    try {
        console.log(water.waterAmount);
        // Decrements the water
        // Checks if the water amount is 0:
        if (water.waterAmount > 0) {
            // Decrements by 1
            water.waterAmount = water.waterAmount - waterAmount;    
            // Saves the updated water info
            await water.save();
    
            res.status(200).json({
                message : `Amount for water id ${water._id} has successfully been deleted`,
                water,
            });
        } else {
            return next(errorHandler(400, 'The water amount is already 0 and cannot be further decremented'));
        }
    } catch (error) {
        next(errorHandler(error.statusCode, error.message));
    }
}

export const deleteWater = async (req, res, next) => {
    // Gets the user id
    const userId = req.user.id;

    // Checks if the user is deleting THEIR water amount
    if (userId !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to delete this person's water amount"));
    }

    // Finds the water amount that will be deleted:
    const water = Water.findById(req.params.waterId);

    // If not found, returns a 404 error.
    if (!water) {
        return next(errorHandler(404, 'Water information not found'));
    }
    // If all of the conditions are met:
    try {
        // Deletes the water amount
        await Water.findByIdAndDelete(req.params.waterId);
        
        // gets the water information of the user and assigns it to
        // a variable called water
        const water = await Water.find({ userId });

        // Sends back the response in a JSON format with a 200 status code.
        res.status(200).json({
            message: "The water amount has successfully been deleted.",
            water,
        });
    } catch (error) {
        // Handles any possible error that may occur
        next(errorHandler(error.statusCode, error.message));
    }
}

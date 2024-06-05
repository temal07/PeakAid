import Activity from "../models/activityModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const getActivity = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Build the query object
        const query = {};

        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        if (req.query.activityId) {
            query._id = req.query.activityId;
        }

        if (req.query.searchTerm) {
            query.$or = [
                { name: { $regex: req.query.searchTerm, $options: 'i' } },
                { caloriesBurnt: { $regex: req.query.searchTerm, $options: 'i' } },
                { category: { $regex: req.query.searchTerm, $options: 'i' } }
            ];
        }

        const activities = await Activity.find(query)
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalActivities = await Activity.countDocuments(query);
        console.log({ activities, totalActivities });

        res.status(200).json({ activities, totalActivities });
    } catch (error) {
        // if an error occurs, provides the error in a more detailed way.
        next(errorHandler(error.statusCode, error.message));        
    }
}

export const addActivity = async (req, res, next) => {
     // Gets the user's id
     const userId = req.user.id;

     const { name, caloriesBurnt, category } = req.body;
     
     // Checks if the form values name, caloriesBurnt, and category are provided
     if (!name || !caloriesBurnt) {
        return next(errorHandler(400, 'Please provide all form values')); 
     }
 
     // Checks if the user's id is equal to the one in URL params
     // (meaning if the user is actually adding an activity on their account)
     if (userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to add any activity info...'));
     }
 
     // if the conditions are met, the try-catch block will execute
     // that is responsible for adding the activity
     try {
         // Saves the activity info to a new var called newActivity
         const newActivity = new Activity({
            userId,
            activity: {
                name, 
                caloriesBurnt, 
                category,
            }
         }); 
 
         // Saves the data inside of the db
         await newActivity.save();
 
         // Returns a 201 response
         res.status(201).json(newActivity);
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message));        
    }
}

export const updateActivity = async (req, res, next) => {
    const userId = req.user.id;

    // if the logged-in user's id doesn't match with the id in the param,
    // sends a 403 response (Forbidden) 
    if (userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this activity...'));
    }
    
    // Finds the activity
    const activity = await Activity.findById(req.params.activityId);

    // However, if the requested actvity does not exist, returns a 404 error
    if (!activity) {
        return next(errorHandler(404, 'Activity not found...'));
    }

    // If all conditions are met, the following try-catch block will be executed

    try {
        // Creates a variable that will store the updates
        // of the activity information.
        const activityToUpdate = await Activity.findByIdAndUpdate(
            req.params.activityId, 
            {
                $set: {
                    'activity.name': req.body.name,
                    'activity.caloriesBurnt': req.body.caloriesBurnt,
                    'activity.category': req.body.category,
                }
            }, 
            { new: true }
        );
        // sends the updated activity information back in a JSON format
        // with a status code of 200 (OK)
        res.status(200).json(activityToUpdate);
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message));    
    }
}

export const deleteActivity = async (req, res, next) => {
    // Gets the user's id
    const userId = req.user.id;

    // if the logged-in user's id doesn't match with the id in the param,
    // sends a 403 response (Forbidden) 
    if (userId !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this activity...'));
    }

    // Finds the activity's id
    const activity = await Activity.findById(req.params.activityId);
    // if the activity doesn't exist, sends a 404 error
    if (!activity) {
        return next(errorHandler(404, 'Activity not found...'));
    }

    // if all of the conditions are met, the following try-catch block will be executed
    try {
        // Finds the food by its id and deletes it from the database;
        await Activity.findByIdAndDelete(req.params.activityId);
        // Gets the food information
        const activity = await Activity.find({ userId });
        res.status(200).json({
            message: 'The activity has successfully been deleted.',
            activity,
        });
    } catch (error) {
        // Handles any possible errors that might occur.
        next(errorHandler(error.statusCode, error.message)); 
    }
}
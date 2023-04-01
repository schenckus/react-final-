import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

/**
 * Define the schema 
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 1},
    reps: { type: Number, required: true, min: 1},
    weight: { type: Number, required: true, min: 1},
    unit: { type: String, 
        required: true, 
        enum: ["kgs", "lbs"]},
    date: { 
        type: String, 
        validate: {
            validator: function(datee) {
                return /^\d\d-\d\d-\d\d$/.test(datee)
            },
        message: props => `${props.value} is not a valid date!`
        },
        required: true, 
    }
});


/**
 * Compile the model from the schema. This must be done after defining the schema 
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * @param {String} name 
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to the JavaScript object for the document created by calling save 
 */
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save()
}

const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit);
    return query.exec();
}

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec()
}

const updateExercise = async(filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    return result.modifiedCount;
}

const deleteExercise = async (filter) => {
    const result = await Exercise.deleteMany(filter);
    return result.deletedCount;
}

const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createExercise, findExercises, findExerciseById, updateExercise, deleteExercise, deleteById, replaceExercise };
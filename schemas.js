const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");
//here we will write the schema for validating the inserted input text
const extension = (joi) => ({
    //joi configuration
    type: "string", // The type of schema. Can be a string, or a regular expression that matches multiple types
    base: joi.string(), // The base schema to extend from. This key is forbidden when type is a regular expression
    messages: {
        // A hash of error codes and their messages.
        "string.escapeHTML": "{{#label}} must not include HTML!",
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value)
                    return helpers.error("string.escapeHTML", { value });
                return clean;
            },
        },
    },
});

const Joi = BaseJoi.extend(extension);
//make sure to escapeHtml in every type of string

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        //because we  use req.body.someObjName
        reviewRating: Joi.number().required().min(1).max(10),
        reviewBody: Joi.string().required().escapeHTML(),
    }).required(),
});

module.exports.mealSchema = Joi.object({
    meal: Joi.object({
        mealName: Joi.string().required().min(2).max(40).escapeHTML(),
        mealSummary: Joi.string().required().min(5).max(200).escapeHTML(),
        mealDescription: Joi.string().required().min(10).max(200).escapeHTML(),
        mealMeatInfo: Joi.array().required(),
        mealPreparationTechniques: Joi.string()
            .required()
            .valid("תנור", "מנגל", "מחבת", "גז")
            .escapeHTML(),
        mealPreparationTime: Joi.number().required().min(5).max(500),
        mealPreparationDifficult: Joi.string()
            .required()
            .valid("קל", "בינוני", "קשה")
            .escapeHTML(),
        mealNumberOfPeopleItSuits: Joi.number().min(1).max(15).required(),
        mealRecommendedSideMeals: Joi.array(),
        mealImage: Joi.array(),
        mealMeatQuantityGram: Joi.number().min(200).max(5000),
        mealAdditionalIngredients: Joi.string()
            .required()
            .min(3)
            .max(200)
            .escapeHTML(),
        mealTotalPrice: Joi.number().required(),
        mealLikes: Joi.array(),
    }).required(),
});

module.exports.sideMealSchema = Joi.object({
    sideMeal: Joi.object({
        sideMealName: Joi.string().required().min(2).max(40).escapeHTML(),
        sideMealSummary: Joi.string().required().min(5).max(200).escapeHTML(),
        sideMealDifficult: Joi.string()
            .required()
            .valid("קל", "בינוני", "קשה")
            .escapeHTML(),
        sideMealEstimatedPrice: Joi.number().required().min(5).max(100),
        sideMealImageUrl: Joi.array(),
        sideMealIngriedents: Joi.string().required().min(3).max(200).escapeHTML(),
        sideMealPreperationDescription: Joi.string().required().min(10).escapeHTML(),
        sideMealPreperationEstimatedTime: Joi.number().required().min(5).max(60),
        sideMealnumberOfPeopleItSuits: Joi.number().required().min(1).max(30),
        sideMealLikes: Joi.array(),
    }).required(),
});
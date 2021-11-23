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
    mealName: Joi.string().required().min(3).max(40).escapeHTML(),
    mealSummary: Joi.string().required().min(10).max(200).escapeHTML(),
    mealMeatInfo: Joi.array().required(),
    mealPreparationTechniques: Joi.string()
      .required()
      .valid("oven", "grill", "pan", "gas")
      .escapeHTML(),
    mealPreparationTime: Joi.number().required().min(5).max(500),
    mealPreparationDifficult: Joi.string()
      .required()
      //.valid("קל", "בינוני", "קשה")
      .valid("easy", "medium", "hard")
      .escapeHTML(),
    mealNumberOfPeopleItSuits: Joi.number().min(1).max(15).required(),
    mealRecommendedSideMeals: Joi.array(),
    mealImage: Joi.array(),
    mealMeatQuantityGram: Joi.number().min(200).max(5000),
    //mealEstimatedMeatPrice: Joi.number() /*.required()*/,
    mealAdditionalIngredients: Joi.string()
      .required()
      .min(3)
      .max(200)
      .escapeHTML(),
    //mealAdditionalsIngredientsPrice: Joi.number().min(5).max(50),
    mealTotalPrice: Joi.number().required(),
    mealDescription: Joi.string().required().min(10).max(200).escapeHTML(),
    // mealAuthor: Joi.string().required().escapeHTML(),
    // mealIsRecommended: Joi.bool(),
  }).required(),
});

module.exports.sideMealSchema = Joi.object({
  sideMeal: Joi.object({
    sideMealName: Joi.string().required().min(3).max(40).escapeHTML(),
    sideMealSummary: Joi.string().required().min(10).max(200).escapeHTML(),
    sideMealDifficult: Joi.string()
      .required()
      .valid("easy", "medium", "hard")
      .escapeHTML(),
    sideMealEstimatedPrice: Joi.number().required().min(5).max(100),
    sideMealImageUrl: Joi.array(),
    sideMealIngriedents: Joi.string().required().min(3).max(200).escapeHTML(),
    sideMealPreperationDescription: Joi.string().required().min(3).escapeHTML(),
    sideMealPreperationEstimatedTime: Joi.number().required().min(5).max(60),
    sideMealnumberOfPeopleItSuits: Joi.number().required().min(1).max(30),
  }).required(),
});

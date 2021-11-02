const Meat = require("../models/meat");

module.exports.index = async (req, res) => {
  //this is how to insert some dummy data to mongo
  const meats = await Meat.find({});
  res.send(meats);
};
module.exports.meatById = async (req, res) => {
  const meat = await Meat.findById(req.params.id);
  res.send(meat);
};

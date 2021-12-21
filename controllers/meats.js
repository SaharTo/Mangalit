const Meat = require("../models/meat");

module.exports.index = async(req, res) => {
    //this is how to insert some dummy data to mongo
    const meats = await Meat.find({});
    res.send(meats);
};
module.exports.meatById = async(req, res) => {
    const meat = await Meat.findById(req.params.id);
    res.send(meat);
};

module.exports.createMeat = async(req, res) => {
    // console.log(req.body.meat);
    const meat = new Meat(req.body.meat);
    await meat.save();
    res.send('נוצרה בהצלחה');
};
module.exports.updateMeat = async(req, res) => {
    const { id } = req.params;
    const meat = await Meat.findByIdAndUpdate(id, {...req.body.meat });
    await meat.save();
    // console.log(meat);
    res.send("בשר עודכן")
};
module.exports.deleteMeat = async(req, res) => {
    await Meat.findByIdAndDelete(req.params.id);
    res.send("בשר נמחק")
};
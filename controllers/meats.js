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
    const meat = new Meat(req.body);
    if (req.files) {
        meat.meatImage = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
    }
    await meat.save();
    res.send(meat);
};
module.exports.updateMeat = async(req, res) => {
    const { id } = req.params;
    const meat = await Meat.findByIdAndUpdate(id, {...req.body });
    // const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body.sideMeal });
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        meat.meatImage.push(...imgs);
    }
    await meat.save();
    res.redirect(`/meats/${id}`)
};
module.exports.deleteMeat = async(req, res) => {
    await Meat.findByIdAndDelete(req.params.id);
    res.redirect("/meats")
};
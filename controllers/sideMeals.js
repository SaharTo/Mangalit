const SideMeal = require("../models/sideMeal");
const mongoose = require("mongoose");

module.exports.sideMealIndex = async(req, res) => {
    const sideMeals = await SideMeal.find({});
    const sideM = sideMeals.map((sideMeal) => {
        return {
            id: sideMeal._id,
            name: sideMeal.sideMealName
        }
    })
    res.send(sideM);
};

module.exports.sideMealById = async(req, res) => {
    const sideMeal = await SideMeal.findById(req.params.id);
    res.send(sideMeal);
};

module.exports.deleateSideMeal = async(req, res) => {
    await SideMeal.findByIdAndDelete(req.params.id);
    res.redirect("/sideMeals")
};

module.exports.updateSideMeal = async(req, res) => {
    const { id } = req.params;
    const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body });
    // const sideMeal = await SideMeal.findByIdAndUpdate(id, {...req.body.sideMeal });
    if (req.files) {
        const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
        SideMeal.sideMealImage.push(...imgs);
    }
    await sideMeal.save();
    res.redirect(`/sideMeals/${req.params.id}`)
};

module.exports.createSideMeal = async(req, res) => {
    const sideMeal = new SideMeal(req.body);
    // const sideMeal = new SideMeal(req.body.sideMeal);
    if (req.files) {
        sideMeal.sideMealImage = req.files.map((f) => ({
            url: f.path,
            filename: f.filename,
        }));
    }
    if (req.user) {
        sideMeal.sideMealsAuthor = req.user._id;
    }
    sideMeal.sideMealsReviews = [];
    await sideMeal.save();
    res.send(sideMeal);
};
//for tests
module.exports.createSideMeal2 = async(req, res) => {
    const sideMeal = new SideMeal();
    sideMeal.sideMealName = 'ציפס בטטה';
    sideMeal.sideMealSummary = 'רצועות בטטה בתנור'
    sideMeal.sideMealDifficult = '1'
    sideMeal.sideMealEstimatedPrice = '7'
    sideMeal.sideMealIngriedents = `3 בטטות
    7 כפות שמן זית
    מלח ופלפל
    1/2 כפית אבקת שום
    קצת טימין `
    sideMeal.sideMealPreperationDescription = `את הבטטות ניתן לקלוף, אך מומלץ לשטוף היטב (עם סקוץ') ולהשאיר את הקליפה.
    חותכים את הבטטות לרצועות דקות, אך לא דקות מידי, בעובי של אצבע.
    מרפדים תבנית תנור בנייר אפייה ומפזרים את צ'יפס הבטטה על התבנית בשכבה אחת.
    בוזקים שמן זית ומערבבים היטב, כל הבטטות צריכות להיות מצופות בשמן, אך לא לשחות בו.
    מפזרים מלח גס, פלפל שחור ואבקת שום באופן שווה ככל שניתן ומערבבים. זה הזמן להוסיף טימין את תבלין גריל.
    מטגנים את צ'יפס הבטטה בשמן עמוק חם 4-6 דקות.
    לאפייה: מחממים תנור ל-200 מעלות ואופים את הצ'יפס בטטה בתנור חם כ-20 דקות. לאחר 10 דקות אפייה, מוציאים את התבנית מהתנור, מערבבים בעדינות ומחזירים את הצ'יפס לתנור עד להזהבה.
    מוציאים מהתנור, ממליחים בשנית (לפי הצורך) ומגישים`
    sideMeal.sideMealPreperationEstimatedTime = '35'
    sideMeal.sideMealnumberOfPeopleItSuits = '3'
    await sideMeal.save();
    res.send(sideMeal);
};
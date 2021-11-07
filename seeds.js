const Http = new XMLHttpRequest();
const url = 'http://localhost:3000';
Http.open("POST", url);
Http.send();


async function postData(url = url, data = { user }) {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}



//-- -- -- -- --JSON FOR USER INPUTS-- -- -- -- -- -- --
const user = {
    "userEmail": "s2234@gmail.com",
    "username": "toleMaster",
    "password": "123456",
    "fullName": "fullName"
}

//-- -- -- -- --JSON FOR MEAT INPUTS-- -- -- -- -- -- --
const meat = {
    "meatType": "בקר",
    "meatName": " ורד הצלע / אנטריקוט / סטייק עין",
    "meatDescription": "נתח בעל עובי בינוני, מאופיין בשיוש של שומן ובמרכזו “עין” מרכזית של שומן, המקנה לו צורה של פרח. הוא נמצא בחלקה הקדמי של הבהמה. האנטריקוט מתאים לסטייקים בכל העוביים, לצלייה קצרה ויבשה בנתח אחד, או להכנה על גריל בנתח אחד",
    "meatNumber": "1",
    "meatPricePerOneKg": "150-200"
}

//-- -- -- -- --JSON FOR REVIEW INPUTS-- -- -- -- -- -- --
const review = {
    "reviewBody": "מושלם",
    "reviewRating": "10"
}

//-- -- -- -- --JSON FOR MEAL INPUTS-- -- -- -- -- -- --
const meal = {
    "mealName": "Huburger",
    "mealSummary": "Hunburger oSol Ta'aim retzah",
    "mealMeatInfo": "THis DATA should be taken from meatCollection",
    "mealPreparationTechniques": "Mangal, Pan",
    "mealPreparationTime": "20",
    "mealPreparationDifficult": "3",
    "mealNumberOfPeopleItSuits": "5",
    "mealRecommendedSideMeals": "FROM SIDEMEALS COLLECTION",
    "mealImage": [],
    "mealMeatQuantityGram": "1000",
    "mealEstimatedMeatPrice": "60",
    "mealAdditionalIngredients": "Bread, pickels, tomato, maio, ketchop",
    "mealAdditionalsIngredientsPrice": "20",
    "mealTotalPrice": "80",
    "mealDescription": "This Burger will make you feel that you are on stairway to heaven",
    "mealAuthor": "Tole", //here mongoose expect unique ObjectId of an exist user.
    "mealReviews": "", //when inserting new meal, you should not add this line because there is not any revies yet
    "mealIsRecommended": "false"
}

//-- -- -- -- --JSON FOR SIDEMEAL INPUTS-- -- -- -- -- -- --
const sideMeal = {

    "sideMealName": "ציפס בטטה",
    "sideMealSummary": "רצועות בטטה בתנור",
    "sideMealDifficult": "1",
    "sideMealEstimatedPrice": "7",
    "sideMealIngriedents": "3 בטטות , 7 כפות שמן זית , מלח ופלפל ,1/2 כפית אבקת שום ,קצת טימין",
    "sideMealPreperationDescription": "את הבטטות ניתן לקלוף, אך מומלץ לשטוף היטב (עם סקוץ') ולהשאיר את הקליפה. חותכים את הבטטות לרצועות דקות, אך לא דקות מידי,  בעובי של אצבע.מרפדים תבנית תנור בנייר אפייה ומפזרים את צ 'יפס הבטטה על התבנית בשכבה אחת.    בוזקים שמן זית ומערבבים היטב,    כל הבטטות צריכות להיות מצופות בשמן,    אך לא לשחות בו.    מפזרים מלח גס,    פלפל שחור ואבקת שום באופן שווה ככל שניתן ומערבבים.זה הזמן להוסיף טימין את תבלין גריל.    מטגנים את צ 'יפס הבטטה בשמן עמוק חם 4-6 דקות.  לאפייה: מחממים תנור ל-200 מעלות ואופים את הצ'    יפס בטטה בתנור חם כ - 20 דקות.לאחר 10 דקות אפייה,    מוציאים את התבנית מהתנור,    מערבבים בעדינות ומחזירים את הצ 'יפס לתנור עד להזהבה. מוציאים מהתנור, ממליחים בשנית (לפי הצורך) ומגישים",
    "sideMealPreperationEstimatedTime": "35",
    "sideMealnumberOfPeopleItSuits": "3"
}
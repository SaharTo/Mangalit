const Http = new XMLHttpRequest();
const url = 'http://localhost:3000';
Http.open("POST", url);
Http.send();



const user = {
    userEmail: 's2234@gmail.com',
    username: 'toleMaster',
    password: '123456',
    fullName: 'fullName'
}

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



----------JSON FOR MEAL INPUTS--------------
{
    "mealName":"Huburger",
    "mealSummary":"Hunburger oSol Ta'aim retzah",
    "mealMeatInfo":"THis DATA should be taken from meatCollection",
    "mealPreparationTechniques":"Mangal, Pan",
    "mealPreparationTime":"20",
    "mealPreparationDifficult":"3",
    "mealNumberOfPeopleItSuits":"5",
    "mealRecommendedSideMeals":"FROM SIDEMEALS COLLECTION",
    "mealImage":[],
    "mealMeatQuantityGram":"1000",
    "mealEstimatedMeatPrice":"60",
    "mealAdditionalIngredients":"Bread, pickels, tomato, maio, ketchop",
    "mealAdditionalsIngredientsPrice":"20",
    "mealTotalPrice":"80",
    "mealDescription":"This Burger will make you feel that you are on stairway to heaven",
    "mealAuthor":"Tole",//here mongoose expect unique ObjectId of an exist user.
    "mealReviews":"",//when inserting new meal, you should not add this line because there is not any revies yet
    "mealIsRecommended":"false"


}

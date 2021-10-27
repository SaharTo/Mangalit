const Http = new XMLHttpRequest();
const url='http://localhost:3000';
Http.open("POST", url);
Http.send();



const user = {userEmail='s234@gmail.com', username='toleMaster', password='123456', fullName='fullName'}

async function postData(url = url, data = {user}) {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header

}


const registrationForm = document.querySelector("#registration-form");

const usersArea = document.querySelector(".users-area");
const lagosUserBtn = document.querySelector(".btn");
const allUsersBtn = document.querySelector(".all-users-btn");
const allUsersArea = document.querySelector(".all-users-area")


registrationForm.addEventListener("submit", function(e){
    e.preventDefault();

    firstName = registrationForm.firstname.value.trim();
    lastName = this.lastname.value.trim();
    email = this.email.value.trim();
    password = this.password.value.trim();

    //check if the input fields contain values

    if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && password.length > 0){

        const objParams = {
            first : firstName,
            last : lastName,
            email : email,
            password : password
        }
        //console.log(objParams);

        // console.log(axios); This will display the axios on console to show it's well added

        axios.post("http://127.0.0.1:3000/submit-registration", objParams).then((feedback)=>{

            alert(feedback.data.message)
            console.log(feedback);
           
            // This will display the feedback from the server on the console
        })
    }
    
})

lagosUserBtn.onclick = function(){

    axios.get("http://127.0.0.1:3000/users?address=lagos").then((feedback) =>{
        getUsers = feedback.data
       // console.log(feedback);

        tableDisplay = `<table>
                         <thead>
                         <th>name</th>
                         <th>age</th>
                         <th>Address</th>
                         </thead>

                         <tbody>`;

    for(let i = 0; i < getUsers.length; i++){

        tableDisplay += `<tr>
                         <td>${getUsers[i]['name']}</td>
                         <td>${getUsers[i]['age']}</td>
                         <td>${getUsers[i]['address']}</td>
                         </tr>`

    } 
    
       tableDisplay+=`</tbody></table>`

       usersArea.innerHTML = tableDisplay;
       
        
    })
}

allUsersBtn.onclick = function(){
    axios("http://127.0.0.1:3000/users").then((feedback) =>{
        //console.log(feedback.data);

        allUsers = feedback.data
        //NB since ur feedback is inside an array, u must loop through to have access
        let listItems = `<ol>`
        for(let i=0; i < allUsers.length; i++){
            //console.log(allUsers[i]);
            
            listItems += `<li>${allUsers[i].name}-${allUsers[i].age}-${allUsers[i].address}</li>`
              
        }

        listItems += `</ol>`

        allUsersArea.innerHTML = listItems
  

    })
}


const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.org/"
var id


if (userID) {
   
    fetch(apiUrl + `/user/`+userID)
    .then((res)=>res.json())
    .then((data)=>{
      if(!data.UserIsOwner){
       window.location=`${winUrl}logs/login.html`
      }
    })
 }

fetch(apiUrl + `/user`)
   .then((res)=>res.json())
   .then((data)=>{
    data.reverse()
     for (let i = 0; i < data.length; i++) {
        const element = data[i];
        request(element)
        click()
     }
   })


   function request(data){
    var html=`
    <li>
    <h6 class="hid">${data._id}</h6>
    <span>
        <h2 class="name">User Name: ${data.UserName}</h2>
        <h2 class="email">User Email: ${data.UserEmail}</h2>
        <h2>User Is a Vendor:<b> ${data.UserIsAdmin}</b></h2>
    </span>
    <img src="../assets/image/maximize.png" alt="" style="align-self: flex-start;">
</li>
    `
    var ul=document.getElementsByClassName("content")[0].getElementsByTagName("ul")[0]
    ul.insertAdjacentHTML('beforeend',html)
 }


 function click() {
    var items=document.getElementsByTagName("li")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click",(e)=>{
            var bnt=e.target
            id=bnt.getElementsByClassName("hid")[0].innerHTML;
            popUp()
        })
    }
 }


 function popUp(){
    document.querySelector(".load_body").classList.add("loader_out")
    fetch(apiUrl + `/user/`+ id)
    .then((res)=>res.json())
    .then((data)=>{
        pod(data)
        document.querySelector(".load_body").classList.remove("loader_out")
    })
    
 }


 function remove(){
    document.getElementsByClassName("popup")[0].classList.remove("see")
 }


 function pod(data){
    document.getElementsByClassName("popup")[0].classList.add("see")
    document.getElementsByClassName("popup")[0].innerHTML=`
    <section class="pop-pay " style="align-self: center;">
            <h1 style="display: flex; flex-direction: row; align-items: center; position: relative;">
                <b onclick="remove()" style="cursor: pointer; justify-self: right; position: absolute; left: 0; height: 100%; width: 10%; background-color: #e0dede; display: flex; align-items: center; justify-content: center; color: #000;" > < </b>
               User's details  
            </h1>
            <h2>
                
            </h2>
            <span>
                <h3>
                    User's Name
                </h3>
                <h3>
                    ${data.UserName}
                </h3>
            </span>
            <span>
                <h3>
                    User's Email
                </h3>
                <h3>
                    ${data.UserEmail}
                </h3>
            </span>
            <span>
                <h3>
                    User is an admin
                </h3>
                <h3>
                    ${data.UserIsAdmin}
                </h3>
            </span>
            <span>
               <button onclick="declin()">
                Remove admin
               </button>
               <button onclick="process()">
                Make admin
               </button>
            </span>
        </section>
    `
 }


 function process(){
    document.querySelector(".load_body").classList.add("loader_out")
    const params = {
        UserIsAdmin:true,       
      };
    const requestOptionsForTicketPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
      };
      // Make the fetch request
      fetch(apiUrl + `/user/`+ id, requestOptionsForTicketPut)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            popUp()
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
 }

 function declin(){
    document.querySelector(".load_body").classList.add("loader_out")
    const params = {
        UserIsAdmin:false,       
      };
    const requestOptionsForTicketPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
      };
      // Make the fetch request
      fetch(apiUrl + `/user/`+ id, requestOptionsForTicketPut)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            popUp()
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
 }


 var input=document.getElementsByClassName("content")[0].getElementsByTagName("input")[0]

 input.addEventListener("keyup", ()=>{
    var items=document.getElementsByTagName("li")
    var value=input.value
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        
        var name=element.getElementsByClassName("name")[0].innerHTML
        var email=element.getElementsByClassName("email")[0].textContent
        if(!name.includes(value) || !email.includes(value)){
           element.classList.add("hid")
        }else {
            element.classList.remove("hid"); // Remove the "hid" class if there's a match
        }
    }
    if (value === "") {
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            element.classList.remove("hid");
        }
    }
 })

 
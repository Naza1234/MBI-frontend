const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.org/"


const currentURL = window.location
var id

fetch(apiUrl + `/PurchaseTicket`)
.then((res)=>res.json())
.then((data)=>{
    data.reverse()
   for (let i = 0; i < data.length; i++) {
     request(data[i])
   }
   click()
})

function request(data){
    var html=`
    <li>
    <h6 class="hid">${data._id}</h6>
    <span>
        <h2>
        PaymentID: ${data.PaymentID}
        </h2>
        <h2>
        Approved: ${data.Approved}
        </h2>
    </span>
    <img src="../assets/image/maximize.png" alt="">
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
            console.log(id);
        })
    }
 }

var name
var non
var price
var img
var pid
var tid
var uid
var uname
var uemail
function popUp(){
    document.querySelector(".load_body").classList.add("loader_out")
    fetch(apiUrl + `/PurchaseTicket/`+id)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(id);
       img=data.ProofImg
       pid=data.PaymentID
       tid=data.TicketID
       uid=data.UserID
       fetch(apiUrl + `/Ticket/`+data.TicketID)
       .then((res)=>res.json())
       .then((data)=>{
         name=data.Title
         non=data.TicketNo
         fetch(apiUrl + `/Raffle/`+data. RaffleId)
       .then((res)=>res.json())
       .then((data)=>{
         price=data.Price
         document.querySelector(".load_body").classList.remove("loader_out")
         pod()
       })
       })
    })
    
 }
 function remove(){
    document.getElementsByClassName("popup")[0].classList.remove("see")
 }

 function pod(){
    document.getElementsByClassName("popup")[0].classList.add("see")
    document.getElementsByClassName("popup")[0].innerHTML=`
    <section class="pop-pay">
    <h1>
        Ticket details  
    </h1>
    <h2>
        ${name}
    </h2>
    <span>
        <h3>
            Ticket price
        </h3>
        <h3>
            ${price}
        </h3>
    </span>
    <span>
        <h3>
            Ticket number
        </h3>
        <h3>
            ${non}
        </h3>
    </span>

    <h6>
        Withdrawal Requests 
    </h6>
    <span>
        <h3>
            ID
        </h3>
        <h3>
            ${pid}
        </h3>
    </span>
    <span>
        <h3>
            Image
        </h3>
    </span>
    <details class="imgit">
    <img src="${img}" alt="">
    </details>
    <span>
       <button onclick="declin()">
        Decline
       </button>
       <button onclick="process()">
        Processed
       </button>
    </span>
</section>
</section>
    `
 }

 function process(){
    document.querySelector(".load_body").classList.add("loader_out")
    const params = {
        Approved:true,       
      };
    const requestOptionsForTicketPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
      };
      // Make the fetch request
      fetch(apiUrl + `/PurchaseTicket/`+id, requestOptionsForTicketPut)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(id);
            // Handle the response data here
          sendgoodmail()
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
 }

 function declin(){
    document.querySelector(".load_body").classList.add("loader_out")
    const params = {
        Both:false,       
      };
    const requestOptionsForTicketPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
      };
      // Make the fetch request
      fetch(apiUrl + `/Ticket/`+tid, requestOptionsForTicketPut)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
 console.log(id);
        fetch(apiUrl + `/PurchaseTicket/`+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Set the content type as needed
            // You may need to include authentication headers or other headers here
          },
        })
          .then((response) => {

            return response.json();
          })
          .then((data) => {
           sendgoodmail()
           
         })
         .catch((error) => {
           console.error('Error deleting item:', error);
           // Handle errors here
         });

          // Handle the response data here
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
 }


 function sendbadmail(){
  
fetch(apiUrl + `/user/`+uid)
.then((res)=>res.json())
.then((data)=>{
  uname=data.UserName
  uemail=data.UserEmail
  
// Define the request body
const params = {
  email:uemail,
  name:uname,
  rafflename:name,
  ticketno:non
};

// Create the fetch options
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/email/badmail`, requestOptions)
  .then((response) => {
    
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    window.location = `${currentURL}`
    // document.querySelector(".load_body").classList.remove("loader_out")
        
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

  
})
 }

 function sendgoodmail(){
  
fetch(apiUrl + `/user/`+uid)
.then((res)=>res.json())
.then((data)=>{
  uname=data.UserName
  uemail=data.UserEmail
  
// Define the request body
const params = {
  email:uemail,
  name:uname,
  rafflename:name,
  ticketno:non
};

// Create the fetch options
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/email/gaodmail`, requestOptions)
  .then((response) => {
    
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    window.location = `${currentURL}`  
    // document.querySelector(".load_body").classList.remove("loader_out")
        
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

  
})
 }
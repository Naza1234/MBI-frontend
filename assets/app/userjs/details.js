const apiUrl = 'https://mbiserver.onrender.com';



var ticketName=""
var ticketPrice=""
var RaffleId=""
var btnId
var btnNo
// Get the current URL
    const currentURL = window.location.search;
    // get url params
     const searchParams= new URLSearchParams(currentURL)
     const itemId=searchParams.get("itemId")
  
    fetch(apiUrl + `/Raffle/`+itemId)
.then((res)=>res.json())
.then((data)=>{
   carrell(data)
   ticketName=data.Title
   ticketPrice=data.Price
   fetch(apiUrl + `/Raffle/ticket/`+data._id)
   .then((res)=>res.json())
   .then((data)=>{
       document.getElementsByClassName("Ticket-available")[0].innerHTML=data.length

       for (let i = 0; i < data.length; i++) {
        ticket(data[i])
        
       }
       popup()
   })
})



function carrell(data){
    var html1=`
    <img src="${data.CoverImg}" alt="">
    <div class="detail-write">
        <h1>
            ${data.Title}
        </h1>
        <span>
            <p>
                Sponsor:
            </p>
            <h2>
                ${data.Sponsor}
            </h2>
        </span>
        <span>
            <p>
                Raffle Prize:
            </p>
            <h2>
                ${data.Prize}
            </h2>
        </span>
        <span>
            <p>
                Ticket Available:
            </p>
            <h2 class="Ticket-available">
                  load...
            </h2>
        </span>
        
            <span>
                <p>
                    Draw Date:
                </p>
                <h2>
                    ${data.DrawDate}
                </h2>
            </span>
        
         
    </div>
    `
    
   var itemCover=document.getElementsByClassName("details-head")[0]
   itemCover.insertAdjacentHTML('beforeend',html1)
}

function ticket(data){
    var html1=`
    <li class="li">
    <div class="cardWrap">
    <p class="hid">${data._id}</p>
        <div class="card cardLeft">
          <h1>${ticketName}</h1>
          <div class="title">
            <h2 class="ticketId">${data.TicketNo}</h2>
            <span>Ticket ID</span>
          </div>
          <div class="name">
            <h2>${ticketPrice}</h2>
            <span>Price</span>
          </div>
         
          
        </div>
        <div class="card cardRight">
         
         
          <div class="barcode"></div>
        </div>
      
      </div>
</li>
    `
    
   var itemCover=document.getElementsByClassName("tick_list")[0]
   itemCover.insertAdjacentHTML('beforeend',html1)
}


function popup() {
   
    var items=document.getElementsByClassName("li")
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        if(!userID){
            window.location = `${winUrl}logs/login.html`
        }else{
          element.addEventListener("click",(e)=>{
            var btn=e.target
             btnId=btn.getElementsByClassName("hid")[0].innerHTML
             btnNo=btn.getElementsByClassName("ticketId")[0].innerHTML
            console.log(btnId,btnNo);
            popupDit(btnId,btnNo)
          })
        }  
    }
}
function popupDit(x,y) {
    RaffleId=x
    document.querySelector(".load_body").classList.add("loader_out")
    fetch(apiUrl +"/PaymentGateWay" )
.then((res)=>res.json())
.then((data)=>{
    document.querySelector(".load_body").classList.remove("loader_out")
    document.getElementsByClassName("popup")[0].classList.add("popupSee")
    var html1=`
  
     <div class="pop">
        <h1>
            Pay now
        </h1>
        <h2>
            ${y}
        </h2>
        <div class="pay">
            <h3>
                Payment gateway
            </h3>
            <span>
                <p>
                    Bank name:
                </p>
                <h4>
                  ${data[0].BankName}  
                </h4>
            </span>
            <span>
                <p>
                    Acc no:
                </p>
                <h4>
                ${data[0].AccountNo} 
                </h4>
            </span>
            <span>
                <p>
                    Acc name:
                </p>
                <h4>
                ${data[0].AccountName} 
                </h4>
            </span>
        </div>
        <div class="proof">
            <label>
                payment ID:
                <input type="text" class="paymentId">
            </label>
            <label>
                Upload img for prove
                <input type="file" class="paymentImg">
            </label>
        </div>
        <button onclick="pay()">
            Submit  
        </button>
        <button onclick="remove()">
            Cancel
        </button>
     </div>
   
    `
    
   var itemCover=document.getElementsByClassName("popup")[0]
   itemCover.innerHTML=""
   itemCover.insertAdjacentHTML('beforeend',html1)
})

}
function pay(){
    document.querySelector(".load_body").classList.add("loader_out")
   var paymentId= document.querySelectorAll(".paymentId")[0].value
   var paymentImg= document.querySelectorAll(".paymentImg")[0].files[0]

   if (paymentId && paymentImg) {
     const formData= new FormData()
        formData.append('UserID',userID)
        formData.append('TicketID',btnId)
        formData.append("PaymentID",paymentId)
        formData.append("WinStatuses", "inProgress" )
        formData.append("Approved",false)
        formData.append("ProofImg", paymentImg )

// Create the fetch options
const requestOptions = {
  method: 'POST',
  body: formData,
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/PurchaseTicket`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    const params = {
        Both:true,       
      };
    const requestOptionsForTicketPut = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
      };
      var errorIs=false
      // Make the fetch request
      fetch(`${apiUrl}/Ticket/${btnId}`, requestOptionsForTicketPut)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Handle the response data here
          document.getElementsByClassName("popup")[0].classList.remove("popupSee")
          document.querySelector(".load_body").classList.remove("loader_out")
        })
        .catch((error) => {
          // Handle any errors
          console.error('Error:', error);
        });
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });
   }
}
function remove(){
    document.getElementsByClassName("popup")[0].classList.remove("popupSee")
}
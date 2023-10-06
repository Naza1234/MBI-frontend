const apiUrl = 'http://localhost:3000';
const winUrl="http://127.0.0.1:5500/"
const currentURL = window.location
const ToCome =[]
const OnGoing=[]
const ended=[]


const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const year = currentDate.getFullYear();
const month = Math.floor(currentDate.getMonth().toString().padStart(2, '0'))+1; // Months are 0-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;


fetch(apiUrl + `/Raffle`)
.then((res)=>res.json())
.then((data)=>{
    data.reverse()
   for (let i = 0; i < data.length; i++) {
    AllRaffle(data[i])
    if (data[i].StartingDate>formattedDateTime) {
        ToCome.push(data[i])
   
    }
    if(formattedDateTime>data[i].StartingDate && data[i].DrawDate>formattedDateTime){
        OnGoing.push(data[i])
        onGoing(data[i])
    }
    if(formattedDateTime>data[i].StartingDate && data[i].DrawDate<formattedDateTime && !data[i].Ended){
        ended.push(data[i])
        Ended(data[i])
    }
    if(data[i].Ended){
        complet(data[i])
    }
   }
   
})

function Ended(data){
   var html=`
   <li>
   <img src="${data.CoverImg}" alt="">
   <div class="write">
   <h6 class="hid">${data._id}</h6>
      <h2>
      ${data.Title}
      </h2>
      <p>
          Due since
      </p>
      <h2>
      ${data.DrawDate}
      </h2>
        <img src="../assets/image/programming-arrows.png" alt="" class="win">
   </div>
   `
   var ul=document.getElementsByClassName("items")[0].getElementsByTagName("ul")[0]
   ul.insertAdjacentHTML('beforeend',html)
   activebtn()
}

function onGoing(data){
    var html=`
    <li>
    <h6 class="hid">${data._id}</h6>
    <img src="${data.CoverImg}" alt="">
    <div class="write">
       <h2>
       ${data.Title}
       </h2>
       <p>
           Due since
       </p>
       <h2>
       ${data.DrawDate}
       </h2>
    </div>
    `
    var body=document.getElementsByClassName("items")[1].getElementsByTagName("ul")[0]
    body.insertAdjacentHTML('beforeend',html)
}

function AllRaffle(data){
    var html=`
    <li>
    <h6 class="hid">${data._id}</h6>
    <img src="${data.CoverImg}" alt="">
    <div class="write">
       <h2>
       ${data.Title}
       </h2>
       <p>
           Due since
       </p>
       <h2>
       ${data.DrawDate}
       </h2>
    </div>
    `
    var body=document.getElementsByClassName("items")[2].getElementsByTagName("ul")[0]
    body.insertAdjacentHTML('beforeend',html)
}

function complet(data){
    var html=`
    <li>
    <h6 class="hid">${data._id}</h6>
    <img src="${data.CoverImg}" alt="">
    <div class="write">
       <h2>
       ${data.Title}
       </h2>
       <p>
           Due since
       </p>
       <h2>
       ${data.DrawDate}
       </h2>
    </div>
    `
    var body=document.getElementsByClassName("items")[3].getElementsByTagName("ul")[0]
   
   console.log(body); 
   body.insertAdjacentHTML('beforeend',html)
}



var rid

function activebtn(){
    console.log(56);
    var btn=document.getElementsByClassName("win")
    for (let i = 0; i < btn.length; i++) {
    const element = btn[i];
    element.addEventListener("click",(e)=>{
        document.querySelector(".load_body").classList.add("loader_out")
        var nbtn=e.target
        console.log(nbtn);
        var cont = nbtn.parentElement;
        var id=cont.getElementsByClassName("hid")[0].innerHTML
        rid=id
        console.log(id);
        pop(id)
    })
   }
}
function pop(id) {
    fetch(apiUrl + `/Raffle/`+ id)
.then((res)=>res.json())
.then((data)=>{
    console.log(data);
    document.getElementsByClassName("popup")[0].classList.add("see")
    document.getElementsByClassName("top")[0].innerHTML=`
        <img src="${data.CoverImg}" alt="">
        <div class="write">
            
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
            </span 
            <span >
                <p>
                       Ticket Told:
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
            <div>
                <p>
                     set number of winners 
                </p>
                <input type="number" value="1">
                <button onclick="fetchPaymentGateway()">
                    Generate
                </button>
            </div>
            <details>
                
                    <input type="text">
                    <button>
                        Add
                    </button>
                
            </details>
        </div>
        </div>
   
    `
    document.querySelector(".load_body").classList.remove("loader_out")
    update()
})
 
}

function update(){
    console.log(rid);
    fetch(apiUrl + `/Raffle/ticketBoth/`+rid)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementsByClassName("Ticket-available")[0].innerHTML = data.length
    })
}

function fetchPaymentGateway (){
    document.querySelector(".load_body").classList.add("loader_out")
    var input=document.getElementsByTagName("input")[0].value
    console.log(input);
    const requestBody = {
        no: input,
        id: rid, // Replace with the actual raffle ID
    };
    console.log(requestBody);
    fetch(apiUrl+'/Ticket/getWonTickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }).then((response) => {
            return response.json();
          })
        .then((data) => {
                console.log('Selected Payments:', data.selectedPayments);
                console.log('Unselected Payments:', data.unselectedPayments);
                console.log('Selected Tickets:', data.selectedTickets);
                dit(data.selectedTickets)
                const params = {
                    Ended:true,       
                  };
                const requestOptionsForTicketPut = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(params),
                  };
                  // Make the fetch request
                  fetch(apiUrl + `/Raffle/`+rid, requestOptionsForTicketPut)
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                        document.querySelector(".load_body").classList.remove("loader_out")
                      // Handle the response data here
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
};


    function dit(data){
    var itemCont=document.getElementsByClassName("ul_it")[0]
    for (let i = 0; i < data.length; i++) {
        var html1=`
        <li>
                        
        Ticket No: ${data[i].TicketNo}
    
        </li>
        `
       
       itemCont.insertAdjacentHTML('beforeend',html1)
    }
}


function relod(){
    window.location = `${currentURL}`
}
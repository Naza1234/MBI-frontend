const apiUrl = 'http://localhost:3000';
const winUrl="http://127.0.0.1:5500/"
 
var id

fetch(apiUrl + `/RaffleRequest`)
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
        Title: ${data.Title}
        </h2>
        <h2>
       Sponsor: ${data.Sponsor}
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
        })
    }
 }

 function popUp(){
    document.querySelector(".load_body").classList.add("loader_out")
    fetch(apiUrl + `/RaffleRequest/`+id)
    .then((res)=>res.json())
    .then((data)=>{
        document.getElementsByClassName("popup")[0].classList.add("see")
       document.getElementsByClassName("popup")[0].innerHTML=`
       <section class="pop">
       <div class="top">
           <img src="${data.CoverImg}" alt="">
           <div class="write">
               <span>
                   <p>
                        Title
                   </p>
                   <h2>
                          ${data.Title}
                   </h2>
               </span>
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
                          Ticket price
                   </p>
                   <h2>
                          ${data.Price}
                   </h2>
               </span>
               <span>
                   <p>
                           Start date:
                   </p>
                   <h2>
                           ${data.StartingDate}
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
               <span>
                   <p>
                          contact
                   </p>
                   <h2>
                          ${data.ContactEmail}
                   </h2>
               </span>
           </div>
           <button onclick="remove()">
        Cancle
       </button>
       </div>
   </section>
       `

        document.querySelector(".load_body").classList.remove("loader_out")
    })
    
 }
 function remove(){
    document.getElementsByClassName("popup")[0].classList.remove("see")
 }
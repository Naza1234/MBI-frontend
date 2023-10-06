const apiUrl = 'http://localhost:3000';
console.log(userID);



var tickets=[]




fetch(apiUrl + `/user/`+userID)
.then((res)=>res.json())
.then((data)=>{
  document.getElementsByClassName("h2")[0].innerHTML=` <b>welcome back</b>${data.UserName}`
})



fetch(apiUrl + `/user/tickets/`+userID)
.then((res)=>res.json())
.then((data)=>{
    data.reverse()
   for (let i = 0; i < data.length; i++) {
     tickets.push(data[i])
   }
   
   inprogress()
})


function inprogress(){
 var itemCont=document.getElementsByTagName("ul")[0]
 itemCont.innerHTML=""
 removeactive()
   for (let i = 0; i < tickets.length; i++) {
    const element = tickets[i];
      if (element.WinStatuses.toLowerCase()==="inprogress") {

        var html1=`
        <li>
        <div class="cardWrap">
            <div class="card cardLeft">
              <h1>${element.Title}</h1>
              <div class="title">
                <h2>${element.TicketNo}</h2>
                <span>Ticket ID</span>
              </div>
            </div>
            <div class="card cardRight">
             
             
              <div class="barcode"></div>
            </div>
          
          </div>
    </li>
        `
       
       itemCont.insertAdjacentHTML('beforeend',html1)
      }
   }
   document.getElementsByTagName("button")[1].classList.add("activenave-button")

}

function Won(){
 var itemCont=document.getElementsByTagName("ul")[0]
 itemCont.innerHTML=""
 removeactive()
   for (let i = 0; i < tickets.length; i++) {
    const element = tickets[i];
      if (element.WinStatuses.toLowerCase()==="won") {
        var html1=`
        <li>
        <div class="cardWrap">
            <div class="card cardLeft">
              <h1>${element.Title}</h1>
              <div class="title">
                <h2>${element.TicketNo}</h2>
                <span>Ticket ID</span>
              </div>
            </div>
            <div class="card cardRight">
             
             
              <div class="barcode"></div>
            </div>
          
          </div>
    </li>
        `
       
       itemCont.insertAdjacentHTML('beforeend',html1)
      }
   }
   document.getElementsByTagName("button")[2].classList.add("activenave-button")
}

function Loss(){
 var itemCont=document.getElementsByTagName("ul")[0]
 itemCont.innerHTML=""
 removeactive()
   for (let i = 0; i < tickets.length; i++) {
    const element = tickets[i];
      if (element.WinStatuses.toLowerCase()==="loss") {
        var html1=`
        <li>
        <div class="cardWrap">
            <div class="card cardLeft">
              <h1>${element.Title}</h1>
              <div class="title">
                <h2>${element.TicketNo}</h2>
                <span>Ticket ID</span>
              </div>
            </div>
            <div class="card cardRight">
             
             
              <div class="barcode"></div>
            </div>
          
          </div>
    </li>
        `
       
       itemCont.insertAdjacentHTML('beforeend',html1)
      }
   }
   document.getElementsByTagName("button")[3].classList.add("activenave-button")
}

function removeactive(){
    var btn=document.getElementsByTagName("button")
    for (let i = 0; i < btn.length; i++) {
        const element = btn[i];
        element.classList.remove("activenave-button")
    }
}
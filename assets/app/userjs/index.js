const apiUrl = 'https://mbiserver.onrender.com';





var rebut=document.querySelectorAll(".steps")
const ToCome =[]
const OnGoing=[]

if (userID) {
    rebut[0].addEventListener("click",()=>{
        window.location = `${winUrl}user/landing.html`
    })
    rebut[1].addEventListener("click",()=>{
        window.location = `${winUrl}logs/Rafflerequest.html`
    })
}else{
    rebut[0].addEventListener("click",()=>{
        window.location = `${winUrl}logs/login.html`
    })
    rebut[1].addEventListener("click",()=>{
        window.location = `${winUrl}logs/login.html`
    })
}



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
    if (data[i].StartingDate>formattedDateTime) {
        ToCome.push(data[i])
        carrell(data[i])
    }
    if(formattedDateTime>data[i].StartingDate && data[i].DrawDate>formattedDateTime){
        OnGoing.push(data[i])
        activeunction(data[i])
    }
   }
   cal()
   manual()
   activeunctionclick()
})

function carrell(data){
    var html1=`
    <div class="content content_items">
    <img src="${data.CoverImg}" alt="">
    <div class="cover"></div>
    <div class="write">
        <h2 class="title">
            ${data.Title}
        </h2>
        <div class="sub-dit">
           <span>
            <h3>
                Starting on:
            </h3>
            <p>
                ${data.StartingDate}
            </p>
           </span>
           <span>
            <h3>
                Unveil the Prizes
            </h3>
            <p>
                ${data.Prize}
            </p>
           </span>
        </div>
    </div>
</div>
    `
    var html2=`
    <span class="id btn-id"></span>
    `
   var itemCover=document.getElementsByClassName("slideshow")[0]
   itemCover.insertAdjacentHTML('beforeend',html1)
   var itemStartId=document.getElementsByClassName("statid")[0]
   itemStartId.insertAdjacentHTML('beforeend',html2)
}


var countUp=0
var items
var itembtn

function manual(){
    items[0].classList.add("see")
     itembtn[0].classList.add("activeid")
    for (let i = 0; i < items.length; i++) {
        const element = itembtn[i];
        element.addEventListener("click",()=>{
            countUp=i
            for (let i = 0; i < items.length; i++) {
                itembtn[i].classList.remove("activeid")
            }
            for (let i = 0; i < items.length; i++) {
                items[i].classList.remove("see")
            }
            items[i].classList.add("see")
            itembtn[i].classList.add("activeid")
        })
    }
}
function cal() {
    items=document.getElementsByClassName("content_items")
    itembtn=document.getElementsByClassName("btn-id") 
    setInterval(nestimg, 5000);
    
}
function nestimg(){
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("see")
    }
    countUp++
    if (countUp === items.length){
        countUp=0
    }
    
    items[countUp].classList.add("see")
    for (let i = 0; i < items.length; i++) {
        itembtn[i].classList.remove("activeid")
    }
   itembtn[countUp].classList.add("activeid")
   
}

function activeunction(data) {
    var html=`
    <div class="itemcard">
    <h6 class="hid">${data._id}</h6>
    <img src="${data.CoverImg}" alt="">
    <div class="dit">
        <div class="right">
            <h1>
                ${data.Title}
            </h1>
            <span class="dits">
                <h2>
                    Ends on:
                </h2>
                <h3>
                    ${data.DrawDate}
                </h3>
            </span>
        </div>
        <div class="left">
            <span class="dits">
                <h2>
                    Ticke price
                </h2>
                <h3>
                    ${data.Price}
                </h3>
            </span>
            <span class="dits">
                <h2>
                    Unveil the Prizes
                </h2>
                <h3>
                    ${data.Prize}
                </h3>
            </span>
        </div>
    </div>
</div>

    `
    var itemsCover=document.getElementsByClassName("items")[0]
    itemsCover.insertAdjacentHTML('beforeend',html)
}

function activeunctionclick(){
    console.log("IT IS CLICKING");
  var items=document.getElementsByClassName("itemcard")
  for (let i = 0; i <items.length; i++) {
    const element = items[i];
    element.addEventListener("click",(e)=>{
        var perElement=e.target
        var itemId=perElement.getElementsByClassName("hid")[0].innerHTML
        if(userID){
            window.location=`${winUrl}user/details.html?itemId=${itemId}`
        }else{
            window.location=`${winUrl}logs/singup.html`
        }
    })
    
  }
}

function search(){
    var param=document.getElementsByClassName("searchinput")[0].value
    if (param) {
        window.location=`${winUrl}user/landing.html?search=${param}`
    }
}

fetch(apiUrl + `/DoYouKnow`)
.then((res)=>res.json())
.then((data)=>{
    data.reverse()
   for (let i = 0; i < data.length; i++) {
    addToKnow(data[i])
   }
})

function addToKnow(data){
    var html=`
    <div>
    <img src="${data.CoverImg}" alt="">
    <span class="cove"></span>
    <p>
       ${data.Details}
    </p>
    </div>
    `
    var itemsCover=document.getElementsByClassName("scrollable")[0]
    itemsCover.insertAdjacentHTML('beforeend',html)
}
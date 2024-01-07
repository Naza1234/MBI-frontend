var nav=document.getElementsByTagName("nav")[0]
const userID=localStorage.getItem('MBIUserId')
const winUrl="https://mbiworld.org/"
var apiUrl="https://mbiserver.onrender.com"
var UserIsAdmin




if(!userID){
    nav.innerHTML=`
    <div class="logo">
    <b>m</b>
    <b>b</b>
    <b>i</b>
    </div>
    <a href="${winUrl}logs/singup.html?url=${window.location}">
    <button>
    join in
    </button>
    
    </a>
    `
   
}else{
    nav.innerHTML=`
        <div class="logo">
            <b>m</b>
            <b>b</b>
            <b>i</b>
        </div>
        <div class="navit">
        <a href="${winUrl}user/profile.html">
        <button class="profile-btn">
            profile
        </button>
        </a>
                    <img src="${winUrl}/assets/image/exit.png" alt="" onclick="logout()">
                </div>
    ` 
    fetch(apiUrl + `/user/`+userID)
    .then((res)=>res.json())
    .then((data)=>{
      UserIsAdmin=data.UserIsAdmin
      if(UserIsAdmin){
        nav.innerHTML=`
        <div class="logo">
            <b>m</b>
            <b>b</b>
            <b>i</b>
        </div>
        <div class="navit">
        <a href="${winUrl}user/profile.html">
        <button class="profile-btn">
            profile
        </button>
        </a>
        <a href="${winUrl}admine/home.html">
        <button class="profile-btn">
            admin page
        </button>
        </a>
                    <img src="${winUrl}/assets/image/exit.png" alt="" onclick="logout()">
                </div>
    ` 
      }
    })
}
function logout(){
    localStorage.removeItem("MBIUserId")
    window.location = window.location
}




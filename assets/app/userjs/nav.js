var nav=document.getElementsByTagName("nav")[0]
const userID=localStorage.getItem('MBIUserId')
const winUrl="http://127.0.0.1:5500/"
if(!userID){
    nav.innerHTML=`
       <div class="logo">
            <b>m</b>
            <b>b</b>
            <b>i</b>
        </div>
        <a href="${winUrl}logs/singup.html">
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
                    <img src="http://127.0.0.1:5500/assets/image/exit.png" alt="" onclick="logout()">
                </div>
    ` 
}
function logout(){
    localStorage.removeItem("MBIUserId")
    window.location = window.location
}
console.log(userID);
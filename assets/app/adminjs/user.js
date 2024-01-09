
var userID=localStorage.getItem('MBIUserId')
if (userID) {
   fetch(apiUrl + `/user/`+userID)
   .then((res)=>res.json())
   .then((data)=>{
     if(!data.UserIsAdmin){
      window.location=`${winUrl}logs/login.html`
     }
   })
}

fetch(apiUrl + `/user`)
.then((res)=>res.json())
.then((data)=>{
   document.getElementsByClassName("num-users")[0].innerHTML=data.length
})






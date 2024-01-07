

const userID=localStorage.getItem('MBIUserId')
if (userID) {
   
   fetch(apiUrl + `/user/`+userID)
   .then((res)=>res.json())
   .then((data)=>{
     if(!data.UserIsOwner){
      window.location=`${winUrl}logs/login.html`
     }
   })
}else{
   window.location=`${winUrl}logs/login.html`
}

fetch(apiUrl + `/user`)
.then((res)=>res.json())
.then((data)=>{
   document.getElementsByClassName("num-users")[0].innerHTML=data.length
})






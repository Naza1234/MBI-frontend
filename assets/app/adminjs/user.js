
fetch(apiUrl + `/user`)
.then((res)=>res.json())
.then((data)=>{
   document.getElementsByClassName("num-users")[0].innerHTML=data.length
})


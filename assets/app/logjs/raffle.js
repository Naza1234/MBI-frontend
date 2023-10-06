const apiUrl = 'http://localhost:3000';
const winUrl="http://127.0.0.1:5500/"



const input=document.getElementsByTagName("input")
const form=document.getElementsByTagName("form")[0]
const userID=localStorage.getItem('MBIUserId')
// const currentDate = new Date();
// const hours = currentDate.getHours().toString().padStart(2, '0');
// const minutes = currentDate.getMinutes().toString().padStart(2, '0');
// const year = currentDate.getFullYear();
// const month = Math.floor(currentDate.getMonth().toString().padStart(2, '0'))+1; // Months are 0-based, so add 1
// const day = currentDate.getDate().toString().padStart(2, '0');

// const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
// if(input[4].value+" "+input[5].value > formattedDateTime){
//   console.log("itworks");
// }else{
//   console.log("what is it");
// }
// Input: File object (e.g., obtained from an input file element)
var UserName=""
fetch(apiUrl + `/user/${userID}`)
.then((res)=>res.json())
.then((data)=>{
   UserName=data.UserName
   console.log(data);
})

form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
 


const formData= new FormData()
        formData.append('UserName',UserName)
        formData.append('Title',input[0].value)
        formData.append("Sponsor",input[1].value)
        formData.append("Price", input[2].value )
        formData.append("Prize", input[3].value )
        formData.append("StartingDate", input[4].value + "" +input[5].value)
        formData.append("DrawDate", input[6].value + "" +input[7].value)
        formData.append("ContactEmail",input[8].value)
        formData.append("CoverImg", input[9].files[0] )

// Create the fetch options
const requestOptions = {
  method: 'POST',
  body: formData,
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/RaffleRequest`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    console.log('Response Data:', data);
     
    document.getElementsByTagName("h5")[0].innerHTML="Submission susses"  
    document.querySelector(".load_body").classList.remove("loader_out")    
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
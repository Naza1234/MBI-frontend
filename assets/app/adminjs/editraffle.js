const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.org/"



var errorIs=false
const input=document.getElementsByTagName("input")
const form=document.getElementsByTagName("form")[0]

const currentURL = window.location.search;
// get url params
 const searchParams= new URLSearchParams(currentURL)
 const itemId=searchParams.get("raffleID")

 document.querySelector(".load_body").classList.add("loader_out")

 fetch(`${apiUrl}/Raffle/${itemId}`)
 .then((response) => {
   return response.json();
 })
 .then((data) => {
   document.getElementsByTagName("form")[0].innerHTML=`
   <h1>
   Edit  Raffle
</h1>
<ul>
   <li>
       
           Title
           <input type="text" placeholder="Example" required value="${data.Title}">
       
   </li>
 
   <li>
       
           Sponsor
           <input type="text" placeholder="Example" required value="${data.Sponsor}">
       
   </li>
  
   <li>
       
           Prize
           <input type="text" required value="${data.Prize}">
       
   </li>
   <li>
       
           Ticket price
           <input type="text" placeholder="" required value="${data.Price}">
       
   </li>
 
   <li>
       
           Starting date    
           <div>
               <input type="date" placeholder="" required>
               <input type="time" placeholder="" required>
           </div>
       
   </li>
  
   <li>
       
           Draw date
           <div>
               <input type="date" placeholder="" required>
               <input type="time" placeholder="" required>
           </div>
       
   </li>
  
</ul>
<button class="button">
   Update 
</button>
   `
    
   document.querySelector(".load_body").classList.remove("loader_out")
   
   })
   .catch((error) => {
     // Handle any errors
     console.error('Error:', error);
   });
 


form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
 


const formData= new FormData()
        formData.append('Title',input[0].value)
        formData.append("Sponsor",input[1].value)
        formData.append("Price", input[3].value )
        formData.append("Prize", input[2].value )
        formData.append("StartingDate", input[4].value + " " +input[5].value)
        formData.append("DrawDate", input[6].value + " " +input[7].value)

// Create the fetch options
const requestOptions = {
  method: 'PUT',
  body: formData,
};


// Make the fetch request
fetch(`${apiUrl}/Raffle/${itemId}`, requestOptions)
.then((response) => {
  return response.json();
})
.then((data) => {
  
   
  document.querySelector(".load_body").classList.remove("loader_out")
  
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.org/"



const input=document.getElementsByTagName("input")
const textarea=document.getElementsByTagName("textarea")
const form=document.getElementsByTagName("form")[0]
form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
 


const formData= new FormData()
        formData.append("Details",textarea[0].value)
        formData.append("CoverImg", input[0].files[0] )

// Create the fetch options
const requestOptions = {
  method: 'POST',
  body: formData,
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/DoYouKnow`, requestOptions)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
     
    document.getElementsByTagName("h5")[0].innerHTML="Submission susses"  
    document.querySelector(".load_body").classList.remove("loader_out")    
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
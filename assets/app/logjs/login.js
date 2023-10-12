const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.org/"



const input=document.getElementsByTagName("input")
const form=document.getElementsByTagName("form")[0]

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
  // Define the API URL

// Define the request body
const params = {
  UserEmail: input[0].value,
  UserPassword: input[1].value,
};

// Create the fetch options
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(params),
};
var errorIs=false
// Make the fetch request
fetch(`${apiUrl}/user/login`, requestOptions)
  .then((response) => {
    if (response.status === 404||401) {
        errorIs=!errorIs
      // Handle the 400 Bad Request error
      console.error('Bad Request Error:', response);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    
        if (errorIs) {
            document.getElementsByTagName("h6")[0].innerHTML=data.message
            document.querySelector(".load_body").classList.remove("loader_out")
        }
          localStorage.setItem('MBIUserId',data.userId);
          window.location = `${winUrl}`
        
          // Store the user ID in local storage
         // You can now access the user ID using localStorage.getItem('MBIUserId')
          // console.log('Stored User ID:', localStorage.getItem('MBIUserId'));
    
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
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
  UserName: input[0].value,
  UserEmail: input[1].value,
  UserPassword: input[2].value,
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
fetch(`${apiUrl}/user/signup`, requestOptions)
  .then((response) => {
    if (response.status === 400) {
        errorIs=!errorIs
      // Handle the 400 Bad Request error
      console.error('Bad Request Error:', response);
    }
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    console.log('Response Data:', data);
        if (errorIs) {
            document.getElementsByTagName("h6")[0].innerHTML=data.message
            document.querySelector(".load_body").classList.remove("loader_out")
        }else{         
          localStorage.setItem('MBIUserId',data._id);
          window.location = `${winUrl}`
        }
          // Store the user ID in local storage
         // You can now access the user ID using localStorage.getItem('MBIUserId')
          console.log('Stored User ID:', localStorage.getItem('MBIUserId'));
    
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
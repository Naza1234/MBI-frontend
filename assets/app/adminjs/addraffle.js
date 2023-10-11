const apiUrl = 'https://mbiserver.onrender.com';
const winUrl="https://mbiworld.online/"



var errorIs=false
const input=document.getElementsByTagName("input")
const form=document.getElementsByTagName("form")[0]

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


form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    document.querySelector(".load_body").classList.add("loader_out")
 


const formData= new FormData()
        formData.append('Title',input[0].value)
        formData.append("Sponsor",input[1].value)
        formData.append("Price", input[2].value )
        formData.append("Prize", input[3].value )
        formData.append("StartingDate", input[4].value + " " +input[5].value)
        formData.append("DrawDate", input[6].value + " " +input[7].value)
        formData.append("CoverImg", input[8].files[0] )

// Create the fetch options
const requestOptions = {
  method: 'POST',
  body: formData,
};

const tickets = [];
function generateRandomString(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}

function requestTickets(numberOfTickets,raffleId,name) {

  for (let i = 0; i < numberOfTickets; i++) {
    const ticket = {
      Title: name,
      TicketNo: generateRandomString(10), // Generate a random 10-character string
      RaffleId: raffleId, // Replace with your raffle ID or logic to determine it
    };

    tickets.push(ticket);
  }
}

// Make the fetch request
fetch(`${apiUrl}/Raffle`, requestOptions)
.then((response) => {
  return response.json();
})
.then((data) => {
  // Handle the response data here
  requestTickets(input[9].value,data._id,data.Title)
  const requestOptionsForTicket = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tickets),
  };
  if(data._id){
    
  fetch(`${apiUrl}/Ticket`, requestOptionsForTicket)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Handle the response data here
    console.log(data);
      document.getElementsByTagName("h5")[0].innerHTML="Raffle susses"  
      document.querySelector(".load_body").classList.remove("loader_out")    
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
  
  }


  
  })
  .catch((error) => {
    // Handle any errors
    console.error('Error:', error);
  });

})
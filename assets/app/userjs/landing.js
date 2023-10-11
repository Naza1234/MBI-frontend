const apiUrl = 'https://mbiserver.onrender.com';


// Get the current URL
    const currentURL = window.location.search;
    // get url params
     const searchParams= new URLSearchParams(currentURL)
     const itemId=searchParams.get("search")

     console.log(itemId);
    document.getElementsByClassName("searchitem")[0].innerHTML=`Results for: ${itemId}`
    function search(){
        var param=document.getElementsByClassName("searchinput")[0].value
        if (param) {
            window.location=`${winUrl}user/landing.html?search=${param}`
        }
    }
     fetch(apiUrl + `/user/search/${itemId}`)
     .then((res)=>res.json())
     .then((data)=>{
        for (let i = 0; i < data.length; i++) {
           activeunction(data[i])
            }
           activeunctionclick()
     })
     
  function activeunction(data){
    var html=`
    <div class="itemcard">
    <h6 class="hid">${data._id}</h6>
    <img src="${data.CoverImg}" alt="">
    <div class="dit">
        <div class="right">
            <h1>
                ${data.Title}
            </h1>
            <span class="dits">
                <h2>
                    Ends on:
                </h2>
                <h3>
                    ${data.DrawDate}
                </h3>
            </span>
        </div>
        <div class="left">
            <span class="dits">
                <h2>
                    Ticke price
                </h2>
                <h3>
                    ${data.Price}
                </h3>
            </span>
            <span class="dits">
                <h2>
                    Unveil the Prizes
                </h2>
                <h3>
                    ${data.Prize}
                </h3>
            </span>
        </div>
    </div>
</div>

    `
    var itemsCover=document.getElementsByClassName("items")[0]
    itemsCover.insertAdjacentHTML('beforeend',html)
  }
  function activeunctionclick(){
    var items=document.getElementsByClassName("itemcard")
    for (let i = 0; i <items.length; i++) {
      const element = items[i];
      element.addEventListener("click",(e)=>{
          var perElement=e.target
          var itemId=perElement.getElementsByClassName("hid")[0].innerHTML
          console.log(itemId);
          window.location=`${winUrl}user/details.html?itemId=${itemId}`
      })
      
    }
  }
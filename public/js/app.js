fetch('http://localhost:3000/weather?address=!').then((response)=>{

           return response.json().then((data)=>{
              if (data.error) {
                  console.log(data.error);
              } else {
                  console.log(data.location);
                  console.log(data.forecast);
              }
           })

})

//Manipulation of Html document
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(event) =>{
   event.preventDefault()// prevent the page to not refresh after submitting the for

   const location = search.value//get the value of input
   console.log(location);

   messageOne.textContent = 'Loading...'
   messageTwo.textContent =''
   fetch('/weather?address='+location).then((response)=>{

           return response.json().then((data)=>{
              if (data.error) {
                  console.log(data.error);
                  messageOne.textContent = data.error
              } else {
                //console.log(data.location);
                //console.log(data.forecast);
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                
              }
           })


        })
})


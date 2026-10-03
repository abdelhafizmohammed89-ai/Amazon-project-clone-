
/*
let xhr = new XMLHttpRequest();
xhr.addEventListener('load', ()=>{
  console.log(xhr.response);
})

xhr.open('GET', 'https://supersimplebackend.dev/greeting');
xhr.send();

  fetch('https://supersimplebackend.dev/greeting')
  .then((response)=>{
  return response.text();
  })
  .then((resultt)=>{
 console.log(resultt);
  });

   async function Exercise() {
    let response = await fetch('https://supersimplebackend.dev/greeting');

   let result = await response.text()

     console.log(result);
   }
  Exercise();


  async function POST(){
    let post = await fetch('https://supersimplebackend.dev/greeting',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name:'Abdulhafiz'
      })
    })

    let result = await post.text();
    console.log(result);
  }
  POST();
*/ 
async function CORS(){
     try{
  let response = await fetch('https://amazon.com');
  } catch(error){
    console.log('CORS error. your request was blocked by the backend');
  }
}
 
async function ERROR(){
  try{
    let fetchh = await fetch('https://supersimplebackend.dev/greeting', {
  method:'POST'
 })
   if(fetchh.status >=400){
    throw fetchh;
   }
} catch(error){
    if(error.status === 400){
    let errror = await error.json();

    console.log(errror);
    }
    else{
      console.log('Network error. Please try again later');
    }
  }
}
ERROR();
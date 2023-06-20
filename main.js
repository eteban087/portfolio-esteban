
const nav = document.getElementById("nav");
const container_bar = document.getElementById("container_bar");
const card_skill = document.querySelectorAll(".card_skill");

// ===================animaciones para las skills
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show")
        }else{
            entry.target.classList.remove("show")
        }
    })
},
{
    threshold: 1
})
// ====================toggle del menu
container_bar.addEventListener("click",()=>{
    nav.classList.toggle("show_menu")
})

card_skill.forEach(element => {
    observer.observe(element)
});


// ===============codigo del formulario

const form_contact = document.getElementById("form_contact");
const btn_send = document.getElementById("btn_send");


form_contact.addEventListener("submit",(e)=>{
   
    e.preventDefault()
   const input = form_contact.elements
   const data ={
    name: input.name.value,
    email: input.email.value,
    message: input.message.value
   }

   fetch("https://formsubmit.co/ajax/9d26978aa273e75f8c447261811d25c5", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        
        data
    })
})
    .then(response => response.json())
    .then(data => {
        Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Your message has been sent',
    showConfirmButton: false,
    timer: 1500,
    
  })
    })
    .catch(error => console.log(error));
    
})

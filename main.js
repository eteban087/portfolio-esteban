const nav = document.getElementById("nav");
const container_bar = document.getElementById("container_bar");
const card_skill = document.querySelectorAll(".card_skill");
const circle = document.querySelector(".circle");
const dark_ligth = document.querySelector(".dark_ligth");
const ls = localStorage;
const claro = ls.getItem("lightMode");
const position = ls.getItem("position");

// ===========================cambio de Idiomas
const flags_element = document.getElementById("flags");

flags_element.addEventListener("click", (e) => {
  changeLeguague(e.target.parentElement.dataset.lenguage);
});

const texsToChange = document.querySelectorAll("[data-section]");

const changeLeguague = async (lenguague) => {
  const requestJson = await fetch(`./languages/${lenguague}.json`);

  const text = await requestJson.json();

  for (let texToChange of texsToChange) {
    const section = texToChange.dataset.section;
    const value = texToChange.dataset.value;

    texToChange.innerHTML = text[section][value];
  }
};

// ====================================

if (position) {
  circle.classList.add(position);
}

if (claro) {
  document.body.classList.add("claro");
  cambiarColorTexto("black");
} else {
  document.body.classList.remove("claro");
  cambiarColorTexto("white");
}

// ================= funcion para cambiar color a textos
function cambiarColorTexto(color) {
  const elementosTexto = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, span, a, li, td, th"
  );

  elementosTexto.forEach((elemento) => {
    elemento.style.color = color;
  });
}

// ======================== funcion para cambiar al modo claro

dark_ligth.addEventListener("click", () => {
  circle.classList.toggle("light");

  if (circle.classList.contains("light")) {
    ls.setItem("lightMode", "claro");
    ls.setItem("position", "light");
    document.body.classList.add("claro");
    cambiarColorTexto("black");
  } else {
    ls.removeItem("lightMode");
    ls.removeItem("position");
    document.body.classList.remove("claro");
    cambiarColorTexto("white");
  }
});

// ===================animaciones para las skills
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  {
    threshold: 1,
  }
);
// ====================toggle del menu
container_bar.addEventListener("click", () => {
  nav.classList.toggle("show_menu");
});

card_skill.forEach((element) => {
  observer.observe(element);
});

// ===============codigo del formulario

const form_contact = document.getElementById("form_contact");
const btn_send = document.getElementById("btn_send");

form_contact.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form_contact.elements;
  const data = {
    name: input.name.value,
    email: input.email.value,
    message: input.message.value,
  };

  fetch("https://formsubmit.co/ajax/estebanmarimon21@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your message has been sent",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => console.log(error));
  setTimeout(() => {
    e.target.reset();
  }, 3000);
});

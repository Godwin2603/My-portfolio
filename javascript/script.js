const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const allSection = document.querySelectorAll(".section");

document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  const homelink = document.getElementById("homelink")
  if (!home) return;

  // Disable animation on first render
  home.classList.add("no-animation");

  // Remove it only when user interacts
  homelink.addEventListener("click", () => {
    home.classList.remove("no-animation");
  });
});
window.addEventListener("load", () => {
  document.documentElement.classList.add("ready");
});


// === NAVIGATION HANDLING ===
navList.forEach((li, i) => {
  const a = li.querySelector("a");
  a.addEventListener("click", (event) => {
    event.preventDefault();
    removeBackSection();
    navList.forEach((li2, j) => {
      const a2 = li2.querySelector("a");
      if (a2.classList.contains("active")) addBackSection(j);
      a2.classList.remove("active");
    });
    a.classList.add("active");
    showSection(a);
  });
});

function removeBackSection() {
  allSection.forEach((section) => section.classList.remove("back-section"));
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  allSection.forEach((section) => section.classList.remove("active"));
  const target = element.getAttribute("href").split("#")[1];
  document.getElementById(target).classList.add("active");
}
function updateNav(element) {
  if (!element || !element.getAttribute("href")) return;
  const target = element.getAttribute("href").split("#")[1];
  navList.forEach((li) => {
    const a = li.querySelector("a");
    a.classList.remove("active");
    const navTarget = a.getAttribute("href").split("#")[1];
    if (target === navTarget) a.classList.add("active");
  });
}

// === CONTACT BUTTON HANDLING ===
document.querySelectorAll(".contact-me[href='#contact']").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    showSection(btn);
    updateNav(btn);
  });
});

let more = document.getElementById('more')
more.addEventListener('click', () => {
  showSection(more)
  updateNav(more)
})
// === SIDEBAR TOGGLE ===
const navTogglerBtn = document.querySelector(".nav-toggler"),
  sideBar = document.querySelector(".side-bar");
if (navTogglerBtn && sideBar) {
  navTogglerBtn.addEventListener("click", () => {
    sideBar.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach((section) => section.classList.toggle("open"));
  });
}

// === CONTACT FORM VALIDATION + SUBMIT ===
const form = document.getElementById("contactForm");
const thankYou = document.getElementById("thankYou");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";

  let valid = true;

  // Name validation
  if (!name.value.trim()) {
    nameError.textContent = "Name is required.";
    valid = false;
  } else if (name.value.trim().length < 3) {
    nameError.textContent = "Name must be at least 3 characters.";
    valid = false;
  } else if (/^\d+$/.test(name.value.trim())) {
    nameError.textContent = "Name cannot contain only numbers.";
    valid = false;
  }

  // Email validation
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (!emailPattern.test(email.value.trim())) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  }

  // Subject validation
  if (!subject.value.trim()) {
    subjectError.textContent = "Subject is required.";
    valid = false;
  } else if (/^\d+$/.test(subject.value.trim())) {
    subjectError.textContent = "Subject cannot contain only numbers.";
    valid = false;
  }

  
  if (!message.value.trim()) {
    messageError.textContent = "Message is required.";
    valid = false;
  } else if (/^\d+$/.test(message.value.trim())) {
    messageError.textContent = "Message cannot contain only numbers.";
    valid = false;
  }

  if (valid) {
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      body: formData
    })
      .then(() => {
        form.style.display = "none";
        thankYou.style.display = "block";
        thankYou.style.opacity = "0";
        thankYou.style.transition = "opacity 0.8s ease";
        setTimeout(() => (thankYou.style.opacity = "1"), 50);
        form.reset();
      })
      .catch((error) => {
        alert("❌ Oops! Something went wrong. Please try again later.");
        console.error(error);
      });
  }
});

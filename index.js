// Variables
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector("nav");
const closeNavbar = document.getElementById("close-navbar");

const formIcon = document.querySelector(".register");
const form = document.querySelector("form");
const formTitle = document.getElementById("formTitle");
const emailInput = document.querySelector(".email-container");
const closeForm = document.getElementById("close-form");
const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const inputs = document.querySelectorAll("input");
let username, email, password;
const progressBar = document.getElementById("progress-bar");

const courseContainer = document.querySelector("main .course-container");

let sliderArray = [
  "./images/home-slide1.jpg",
  "./images/home-slide2.jpg",
  "./images/home-slide3.jpg",
];

let imageIndex = 0;
const slider = document.querySelector(".slider");

let popularCourses = [
  { pic: 1, title: "Programmation", chap: 13 },
  { pic: 2, title: "Comptabilité", chap: 10 },
  { pic: 3, title: "Statistiques", chap: 13 },
  { pic: 4, title: "Analyses Mathématiques", chap: 18 },
  { pic: 5, title: "Algèbre", chap: 4 },
  { pic: 6, title: "Planification", chap: 10 },
];

function handleIcon(tag, otherTag) {
  tag.classList.add("active");
  otherTag.classList.contains("active")
    ? otherTag.classList.remove("active")
    : null;
}

function closeBar(tag, icon) {
  icon.addEventListener("click", () => {
    icon.style.transform = "rotate(90deg)";
    setTimeout(() => {
      tag.classList.remove("active");
      icon.style.transform = "rotate(-90deg)";
    }, 500);
  });
}

function sliderDisplay() {
  if (slider != null) {
    slider.style.background = `url(${sliderArray[imageIndex]}) center/cover no-repeat fixed`;
  }
}

function handleFormButton(button, display, text) {
  button.addEventListener("click", () => {
    emailInput.style.display = display;
    formTitle.textContent = text;
  });
}

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = "";
  }
};

const usernameChecker = (value) => {
  if (value.length < 3 || value.length > 20) {
    errorDisplay(
      "username",
      "Le nom d'utilisateur doit faire entre 3 et 20 caractères."
    );
    username = null;
  } else {
    errorDisplay("username", "", true);
    username = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w]+\.[a-z]{2,4}$/)) {
    errorDisplay("email", "Email invalide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  progressBar.classList = "";

  if (!value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    errorDisplay(
      "password",
      "Le mot doit faire au moins 8 caractères, doit inclure une majuscule, un chiffre et ne doit pas contenir de caractères spéciaux"
    );
    progressBar.classList.add("progress-third");
    password = null;
  } else if (value.length < 12) {
    errorDisplay("password", "", true);
    progressBar.classList.add("progress-two-third");
    password = value;
  } else {
    errorDisplay("password", "", true);
    progressBar.classList.add("progress-complete");
    password = value;
  }
};

// window.innerWidth < 355
//   ? (form.style.width = "100vw")
//   : (form.style.width = "60vw");

if (menuIcon != null) {
  menuIcon.addEventListener("click", () => {
    handleIcon(navbar, form);
    console.log("Y");
  });
}

if (closeNavbar != null) {
  closeNavbar.addEventListener("click", closeBar(navbar, closeNavbar));
}

if (formIcon != null) {
  formIcon.addEventListener("click", () => {
    form.style.right = "0";
  });
}

if (closeForm != null) {
  closeForm.addEventListener("click", () => {
    closeForm.style.transform = "rotate(90deg)";
    setTimeout(() => {
      form.style.right = "-100vw";
      closeForm.style.transform = "rotate(-90deg)";
    }, 500);
  });
}

// if (formIcon != null) {
//   formIcon.addEventListener("click", () => {
//     handleIcon(form, navbar);
//   });
// }

// if (closeForm != null) {
//   closeForm.addEventListener("click", closeBar(form, closeForm));
// }

if (logIn != null) {
  handleFormButton(logIn, "none", "Formulaire de connexion");
}

if (signUp != null) {
  handleFormButton(signUp, "block", "Formulaire d'inscription");
}

// Carousel part

const homeSlider = () => {
  setTimeout(() => {
    if (imageIndex == sliderArray.length) {
      imageIndex = 0;
      homeSlider();
    } else if (imageIndex < sliderArray.length) {
      sliderDisplay();
      imageIndex++;
      homeSlider();
    }
  }, 3000);
};
homeSlider();

// Popular courses part

let mapArray = popularCourses
  .map((course) => {
    return `
    <div class="card">
      <img src="./images/subject-icon-${course.pic}.png" alt="" />
      <h3>${course.title}</h3>
      <span>${course.chap} chapitres</span>
    </div>
  `;
  })
  .join("");

if (courseContainer != null) {
  courseContainer.innerHTML += mapArray;
}

// const cards = document.querySelectorAll("main .course-container .card");
// if (cards.length !== 0) {
//   cards.forEach((card) => {
//     card.addEventListener("mouseenter", (e) => {
//       const learnMore = document.createElement("div");
//       card.appendChild(learnMore);
//     });
//   });
// }

// Form checker

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "username":
        usernameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

if (form != null) {
  if (form.id === "connexionForm") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (username && email && password) {
        const data = {
          username,
          email,
          password,
        };

        sessionStorage.username = username;
        alert(`Inscription validée, ${username} !`);

        username = null;
        email = null;
        password = null;

        inputs.forEach((input) => {
          input.value = "";
        });
        progressBar.classList = "";
      } else {
        alert("Veuillez remplir correctement le formulaire !");
      }
    });
  } else if (form.id === "messageForm") {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.getElementById("message").value;
      alert(`Message reçu. Merci à vous, ${sessionStorage.username}`);
      console.log(message);
    });
  }
}

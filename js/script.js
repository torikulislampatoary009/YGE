
/* =========================================
   YEARA GLOBAL EXPRESS
   Main JavaScript
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menu-toggle");

const nav = document.getElementById("nav");

const navLinks = document.querySelectorAll(".nav-link");

const contactForm = document.getElementById("contact-form");

const formMessage = document.getElementById("form-message");

const currentYear = document.getElementById("current-year");


/* =========================================
   MOBILE NAVIGATION
========================================= */

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

    const isOpen = nav.classList.contains("active");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

});


/* Close mobile menu after clicking a link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   CONTACT FORM
========================================= */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();

    if (!name) {

        formMessage.textContent =
            "Please enter your name.";

        return;

    }


    formMessage.textContent =
        "Thank you! Your request has been received.";


    contactForm.reset();
     
});


/* =========================================
   CURRENT YEAR
========================================= */

currentYear.textContent = new Date().getFullYear();


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


/*=========================================
   CONTACT FORM
========================================= 

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
     
});*/


/* =========================================
   CURRENT YEAR
========================================= */

currentYear.textContent = new Date().getFullYear();

// =========================================
// SHIPMENT TRACKING
// =========================================

const trackingForm =
    document.getElementById(
        "trackingForm"
    );


if (trackingForm) {

    trackingForm.addEventListener(
        "submit",
        handleTracking
    );

}


async function handleTracking(event) {

    event.preventDefault();


    const input =
        document.getElementById(
            "trackingNumber"
        );


    const button =
        document.getElementById(
            "trackingButton"
        );


    const message =
        document.getElementById(
            "trackingMessage"
        );


    const result =
        document.getElementById(
            "trackingResult"
        );


    const trackingNumber =
        input.value.trim();


    if (!trackingNumber) {

        showTrackingMessage(
            "Please enter your tracking or AWB number."
        );

        return;

    }


    // Reset

    message.textContent = "";

    result.hidden = true;

    button.disabled = true;

    button.textContent =
        "Tracking...";


    try {

        const response =
            await fetch(

                `http://localhost:5000/api/public/tracking/${encodeURIComponent(trackingNumber)}`

            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Shipment not found."
            );

        }


        renderTrackingResult(
            data
        );


    } catch (error) {

        console.error(
            "Tracking error:",
            error
        );


        showTrackingMessage(
            error.message ||
            "Unable to track shipment."
        );


    } finally {

        button.disabled = false;

        button.textContent =
            "Track Shipment";

    }

}
function renderTrackingResult(data) {

    const shipment =
        data.shipment;


    const history =
        data.tracking_history || [];


    document.getElementById(
        "resultTrackingNumber"
    ).textContent =
        shipment.tracking_number;


    document.getElementById(
        "resultStatus"
    ).textContent =
        formatTrackingStatus(
            shipment.status
        );


    document.getElementById(
        "resultOrigin"
    ).textContent =
        shipment.origin_country ||
        "-";


    document.getElementById(
        "resultDestination"
    ).textContent =
        shipment.destination_country ||
        "-";


    document.getElementById(
        "resultSender"
    ).textContent =
        shipment.sender_name ||
        "-";


    document.getElementById(
        "resultReceiver"
    ).textContent =
        shipment.receiver_name ||
        "-";


    document.getElementById(
        "resultOriginCountry"
    ).textContent =
        shipment.origin_country ||
        "-";


    document.getElementById(
        "resultDestinationCountry"
    ).textContent =
        shipment.destination_country ||
        "-";


    renderTrackingTimeline(
        history
    );


    const result =
        document.getElementById(
            "trackingResult"
        );


    result.hidden = false;


    // Smooth scroll to result

    result.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}
function renderTrackingTimeline(
    history
) {

    const timeline =
        document.getElementById(
            "trackingTimeline"
        );


    if (!history.length) {

        timeline.innerHTML = `

            <p>
                No tracking history available.
            </p>

        `;

        return;

    }


    timeline.innerHTML =
        history
            .map(
                (event, index) => {

                    const isLast =
                        index ===
                        history.length - 1;


                    return `

                        <div
                            class="
                                timeline-item
                                ${isLast ? "active" : ""}
                            "
                        >

                            <div
                                class="timeline-dot"
                            ></div>


                            <div
                                class="timeline-content"
                            >

                                <div
                                    class="timeline-top"
                                >

                                    <span
                                        class="timeline-status"
                                    >
                                        ${escapeHTML(
                                            formatTrackingStatus(
                                                event.status
                                            )
                                        )}
                                    </span>


                                    <span
                                        class="timeline-date"
                                    >
                                        ${formatTrackingDate(
                                            event.event_time
                                        )}
                                    </span>

                                </div>


                                ${
                                    event.location
                                        ? `
                                            <div
                                                class="timeline-location"
                                            >
                                                ${escapeHTML(
                                                    event.location
                                                )}
                                            </div>
                                          `
                                        : ""
                                }


                                ${
                                    event.description
                                        ? `
                                            <div
                                                class="timeline-description"
                                            >
                                                ${escapeHTML(
                                                    event.description
                                                )}
                                            </div>
                                          `
                                        : ""
                                }

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}
function formatTrackingStatus(
    status
) {

    if (!status) {

        return "Unknown";

    }


    return status

        .replaceAll(
            "_",
            " "
        )

        .replace(
            /\b\w/g,
            letter =>
                letter.toUpperCase()
        );

}


function formatTrackingDate(
    date
) {

    if (!date) {

        return "";

    }


    const parsed =
        new Date(date);


    return parsed.toLocaleString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


function showTrackingMessage(
    text
) {

    const message =
        document.getElementById(
            "trackingMessage"
        );


    message.textContent =
        text;

}


function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}
// ========================================
// QUOTE REQUEST
// ========================================

const quoteForm =
    document.getElementById(
        "quoteForm"
    );


if (quoteForm) {

    quoteForm.addEventListener(
        "submit",
        handleQuoteSubmit
    );

}


async function handleQuoteSubmit(
    event
) {

    event.preventDefault();


    const button =
        document.getElementById(
            "quoteSubmitButton"
        );


    const message =
        document.getElementById(
            "quoteFormMessage"
        );


    button.disabled = true;

    button.textContent =
        "Sending...";

    message.textContent = "";

    message.className =
        "quote-form-message";


    const requestData = {

        name:
            document
                .getElementById(
                    "quoteName"
                )
                .value
                .trim(),

        phone:
            document
                .getElementById(
                    "quotePhone"
                )
                .value
                .trim(),

        email:
            document
                .getElementById(
                    "quoteEmail"
                )
                .value
                .trim(),

        company:
            document
                .getElementById(
                    "quoteCompany"
                )
                .value
                .trim(),

        origin_country:
            document
                .getElementById(
                    "quoteOrigin"
                )
                .value
                .trim(),

        destination_country:
            document
                .getElementById(
                    "quoteDestination"
                )
                .value
                .trim(),

        service_type:
            document
                .getElementById(
                    "quoteService"
                )
                .value,

        package_type:
            document
                .getElementById(
                    "quotePackage"
                )
                .value,

        weight:
            document
                .getElementById(
                    "quoteWeight"
                )
                .value,

        message:
            document
                .getElementById(
                    "quoteMessage"
                )
                .value
                .trim()

    };


    try {

        const response =
            await fetch(
                "http://localhost:5000/api/quotes",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            requestData
                        )

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to submit request."
            );

        }


        message.className =
            "quote-form-message success";


        message.textContent =
            "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";


        quoteForm.reset();


    } catch (error) {

        console.error(error);


        message.className =
            "quote-form-message error";


        message.textContent =
            error.message ||
            "Unable to submit your request.";

    } finally {

        button.disabled = false;

        button.textContent =
            "Request a Quote";

    }

}


const contactForm = document.querySelector(".contact-form form");
const timestampInput = document.getElementById("timestamp");

if (contactForm && timestampInput) {
    contactForm.addEventListener("submit", () => {
        timestampInput.value = new Date().toISOString();
    });
}

document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

import {places} from "../data/discover.mjs";

const gallery = document.querySelector(".discover-gallery");

places.forEach(place => {
    const card = document.createElement("article");
    
    card.innerHTML = `
        <h2 class="place-name">${place.name}</h2>
        <figure class="place-image">
            <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
        </figure>
        <address class="place-address">${place.address}</address>
        <p class="place-description">${place.description}</p>
        <p class="place-cost"><strong>Cost:</strong> ${place.cost}</p>
        <button class="place-button">Learn More</button>
    `;
    gallery.appendChild(card);
});

const visitMessage = document.getElementById("visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitMessage.textContent = "Your last visited 1 day ago.";
    } else {
        visitMessage.textContent = `Your last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("navigation");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
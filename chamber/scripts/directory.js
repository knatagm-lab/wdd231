document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const membersUrl = "data/members.json";

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();

    data.forEach(displayMember);

    console.log(data);
}

getMembers();

function displayMember(member) {
    const card = document.createElement("article");
        card.innerHTML = `

        <img src="${member.image}" alt="${member.name}" width="${member.width}" height="${member.height}">
        <h2>${member.name}</h2>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p>Membership: ${getMembershipName(member.membership)}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        document.querySelector("#members-container").appendChild(card)

}

function getMembershipName(level) {
    if (level === 1) {
        return "Member";
    } else if (level ===2) {
        return "Silver";
    } else {
        return "Gold";
    }
}

const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');
const membersContainer = document.querySelector('#members-container')
const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('#navigation');

menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-grid");
    membersContainer.classList.add("members-list");
});

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("members-list");
    membersContainer.classList.add("members-grid");
});
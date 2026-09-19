document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast')
const spotlightsContainer = document.querySelector('#spotlights-container');
const membersUrl = "data/members.json"

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=2.4448&lon=76.6147&units=metric&appid=fa49f578c13570aef980152dd90180ef';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=2.4448&lon=76.6147&units=metric&appid=fa49f578c13570aef980152dd90180ef';

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

function displayWeather(data) {
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    currentWeather.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}">            
            <p><strong>${data.main.temp}&deg;C</strong></p>
            <p>${description}</p>
        `;

}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error)
    }
}

function displayForecast(data) {
    const forecastDays = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    forecast.innerHTML = ``;

    forecastDays.slice(0, 3).forEach(day => {
        const date = new Date(day.dt_txt);

        forecast.innerHTML += `
            <div class="forecast-day">
                <h4>${date.toLocaleDateString(`en-US`, {weekday: 'long'})}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                    alt="${day.weather[0].description}">
                <div class="forecast-details">
                    <p>${day.main.temp.toFixed(1)}&deg;C</p>
                    <p>${day.weather[0].description}</p>
                </div>
            </div>
        `;
    });
}

getWeather();
getForecast();

async function getMembers() {
    const response = await fetch(membersUrl);
    const data = await response.json();

    displaySpotlights(data);
}

function displaySpotlights(data) {
    const qualifiedMembers = data.filter(member =>
        member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement("article");

        card.innerHTML = `
            <img src="${member.image}"
                alt="${member.name}"
                width="${member.width}"
                height="${member.height}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>Membership: ${getMembershipName(member.membership)}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightsContainer.appendChild(card);
    });
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

getMembers();
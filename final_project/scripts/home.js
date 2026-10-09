
const recipeContainer = document.getElementById("recipe-container");
const homeModal = document.getElementById("home-recipe-modal");
const homeModalContent = document.getElementById("home-modal-content");
const closeHomeModal = document.getElementById("close-home-modal");

async function getRecipeOfTheDay() {
    if (!recipeContainer) return;

    try {
        const response = await fetch("data/recipes.json");

        if (!response.ok) {
            throw new Error("Could not load recipes.");
        }

        const recipes = await response.json();

        if (!recipes.length) {
            throw new Error("No recipes found.");
        }

        const randomIndex = Math.floor(Math.random() * recipes.length);
        const recipe = recipes[randomIndex];

        recipeContainer.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-day-content">
                <p class="recipe-category">${recipe.category}</p>
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <p><strong>Prep Time:</strong> ${recipe.prepTime} min</p>
                <button type="button" id="view-home-recipe" class="button">
                    View Recipe
                </button>
            </div>
        `;

        recipeContainer.addEventListener("click", () => {
            showHomeRecipe(recipes, recipe.name);
        });

    } catch (error) {
        console.error("Error loading recipe of the day:", error);
        recipeContainer.textContent =
            "Sorry, today's recipe could not be loaded.";
    }
}

function showHomeRecipe(recipes, recipeName) {
    if (!homeModal || !homeModalContent || !recipeContainer) return;

    const button = document.getElementById("view-home-recipe");

    if (!button) return;

    const recipe = recipes.find(item => item.name === recipeName);

    if (!recipe) return;

    homeModalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p>${recipe.description}</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime} min</p>
        <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
        <h3>Ingredients</h3>
        <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>
        <h3>Instructions</h3>
        <ol>
            ${recipe.instructions.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

    homeModal.showModal();
}

if (closeHomeModal && homeModal) {
    closeHomeModal.addEventListener("click", () => {
        homeModal.close();
    });
}

getRecipeOfTheDay();

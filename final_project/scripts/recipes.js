const recipesContainer = document.getElementById("recipes-container");
const recipeModal = document.getElementById("recipe-modal");
const modalContent = document.getElementById("modal-content");
const closeModal = document.getElementById("close-modal");

let allRecipes = [];

let selectedCategory = "All";
let selectedTag = "";

closeModal.addEventListener("click", () => {
    recipeModal.close();
});

async function getRecipes() {
    try {
        const response = await fetch("data/recipes.json");

        if (!response.ok) {
            throw new Error("Could not load the recipes.");
        }

        const recipes = await response.json();
        allRecipes = recipes;
        displayRecipes(recipes);

    } catch (error) {
        console.error("Error loading recipes:", error);
        recipesContainer.textContent = "Sorry, recipes could not be loaded.";
    }

}

function displayRecipes(recipes) {
    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {
        recipesContainer.innerHTML += `
            <article class="recipe-card">
                <img
                    src="${recipe.image}"
                    alt="${recipe.name}"
                    loading="lazy"
                >
                <div class="recipe-card-content">
                    <p class="recipe-category">${recipe.category}</p>
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <p>Prep Time: ${recipe.prepTime} min</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                    <button
                        type="button"
                        class="view-recipe"
                        data-id="${recipe.id}"
                    >
                        View Recipe
                    </button>
                </div>
            </article>
        `;
    });
}

const categoryFilters = document.getElementById("category-filters");
const tagFilters = document.getElementById("tag-filters");

categoryFilters.addEventListener("click", event => {
    const button = event.target.closest("button[data-category]");

    if (!button) {
        return;
    }

    selectedCategory = button.dataset.category;

    updateActiveFilter();
    filterRecipes();
});

tagFilters.addEventListener("click", event => {
    const button = event.target.closest("button[data-tag]");

    if (!button) {
        return;
    }

    const clickedTag = button.dataset.tag;

    selectedTag = selectedTag === clickedTag ? "" : clickedTag;

    updateActiveFilter();
    filterRecipes();
});

function filterRecipes() {
    const filteredRecipes = allRecipes.filter(recipe => {
        const matchesCategory =
            selectedCategory === "All" ||
            recipe.category === selectedCategory;

        const matchesTag =
            selectedTag === "" ||
            recipe.tags.includes(selectedTag);
        
        return matchesCategory && matchesTag;
    });

    displayRecipes(filteredRecipes);
}

function updateActiveFilter() {
    categoryFilters.querySelectorAll("button").forEach(button => {
        const isActive = button.dataset.category === selectedCategory;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    tagFilters.querySelectorAll("button").forEach(button => {
        const isActive = button.dataset.tag === selectedTag;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });
}


function openRecipeModal(recipe) {
    if (!recipe) {
        return;
    }

    modalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <img
            src="${recipe.image}"
            alt="${recipe.name}"
            loading="lazy"
        >
        <p>${recipe.description}</p>
        <p><strong>Category: </strong>${recipe.category}</p>
        <p><strong>Prep Time: </strong>${recipe.prepTime} min</p>
        <p><strong>Difficulty: </strong>${recipe.difficulty}</p>

        <h3>Ingredients</h3>
        <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>

        <h3>Instructions</h3>
        <ol>
            ${recipe.instructions.map(step => `
                <li>${step}</li>
                `).join("")}
        </ol>
    `;

    recipeModal.showModal();
}

recipesContainer.addEventListener("click", event => {

    if (!event.target.classList.contains("view-recipe")) {
        return;
    }

    const recipeId = Number(event.target.dataset.id);

    const recipe = allRecipes.find(
        recipe => recipe.id === recipeId
    );

    openRecipeModal(recipe);

});

getRecipes();
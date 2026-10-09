const recipesContainer = document.querySelector("#recipes-container");

async function getRecipes() {
    try {
        const response = await fetch("data/recipes.json");
        if (!response.ok) {
            throw new Error("Could not load the recipes.");
        }
        const recipes = await response.json();
        console.log(recipes);

    } catch (error) {
        console.error("Error loading recipes:", error);
        recipesContainer.textContent = "Sorry, recipes could not be loaded.";
    }
    
}

getRecipes();
export const mockRecipes = [
    { _id: '1', title: 'Recipe 1', ingredients: ['Ingredient 1'], steps: ['Step 1'], image: 'image1.jpg' },
    { _id: '2', title: 'Recipe 2', ingredients: ['Ingredient 2'], steps: ['Step 2'], image: 'image2.jpg' },
];

export const unauthorizedError = {
    response: {
        data:
            { message: /Access denied/i }
    }
}

export const mockRecipe={
    _id: "1",
    title: "Test Recipe",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    steps: "Step 1, Step 2",
    image: "recipe.jpg",
    createdBy: "ayusman@gmail.com" //keeping same as user details email for conditional rendering
}

export const mockRatings = [
    { recipeId:"1",rating: 5, feedback: "Great recipe!", createdBy: "user1@example.com" },
]

export const mockRecipePayload={
    title: "Test Recipe",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    steps: "Step 1, Step 2",
    image: "recipe.jpg",
}
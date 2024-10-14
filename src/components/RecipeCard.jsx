export function RecipeCard({ title, ingredients, steps, imageUrl }) {
    // Limit number of ingredients to display initially
    const displayedIngredients = ingredients?.slice(0, 3);
    const hasMoreIngredients = ingredients?.length > 3;

    return (
        <div className="card max-w-sm p-4 rounded-lg shadow-md bg-white border-gray-300">
            {/* Recipe Image */}
            <img
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Recipe"
                className="card-img w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Recipe Title */}
            <h2 className="text-xl font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">
                {title || "Untitled Recipe"}
            </h2>

            {/* Ingredients */}
            <div className="text-sm text-gray-600 mt-2">
                <h3 className="font-semibold">Ingredients:</h3>
                <ul className="list-disc list-inside max-h-20">
                    {displayedIngredients && displayedIngredients.length > 0 ? (
                        displayedIngredients.map((ingredient, index) => (
                            <li key={index} className="overflow-hidden text-ellipsis whitespace-nowrap">
                                {ingredient}
                            </li>
                        ))
                    ) : (
                        <li>No ingredients provided</li>
                    )}
                </ul>
                {hasMoreIngredients && (
                    <span className="text-gray-400">
                        ...more
                    </span>
                )}
            </div>

            {/* Steps */}
            <div className="text-sm text-gray-600 mt-4">
                <h3 className="font-semibold">Steps:</h3>
                <div className="relative max-h-20 overflow-hidden line-clamp-2">
                    <p>{steps || "No steps provided"}</p>
                    {steps && steps.length > 100 && (
                        <span className="text-gray-400">
                            ...more
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

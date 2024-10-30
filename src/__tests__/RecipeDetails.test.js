// React and third-party imports
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from 'redux-mock-store';
import axios from "axios";
import * as reactCookie from 'react-cookie';
import * as router from "react-router";

// Static imports
import RecipeDetails from "../pages/Recipes/RecipeDetails";
import { ratingStrings, recipeDetailsStrings } from "../utils/constantStrings";
import { userDetails } from "../__mocks__/auth.mock";
import { mockRatings, mockRecipe, unauthorizedError } from "../__mocks__/recipes.mock";

// Mock for axios functions
jest.mock('axios', () => ({
    delete: jest.fn(),
    get: jest.fn(),
}));

// Mock the react-cookie hooks
jest.mock('react-cookie', () => ({
    ...jest.requireActual('react-cookie'),
    useCookies: jest.fn()
}));

const mockNavigate = jest.fn();
const mockStore = configureStore([]);

const renderWithProviders = (ui, { reduxStore } = {}) => {
    return render(
        <Provider store={reduxStore}>
            <CookiesProvider>
                <Router>{ui}</Router>
            </CookiesProvider>
        </Provider>
    );
};

describe("RecipeDetails Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: { userDetails: userDetails },
            theme: { theme: "light" }
        });
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
        // Mock cookie hooks
        jest.spyOn(reactCookie, 'useCookies').mockImplementation(() => [
            { Authorization: 'mock-token' },
        ]);
        jest.clearAllMocks();
    });

    test("fetches and displays recipe details on component mount", async () => {
        // Mocking successful responses
        axios.get
            .mockResolvedValueOnce({data:{data:mockRecipe}})  // Recipe data
            .mockResolvedValueOnce({data:{data:mockRatings}}); // Ratings data
    
        renderWithProviders(<RecipeDetails />, { reduxStore: store });
    
        // Wait for the recipe title to appear
        await waitFor(() => expect(screen.getByText(mockRecipe.title)).toBeInTheDocument());
    
        // Verify other elements
        expect(screen.getByText(recipeDetailsStrings.ingredientsHeader)).toBeInTheDocument();
        expect(screen.getByText(recipeDetailsStrings.steps)).toBeInTheDocument();
        expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
        expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
        expect(screen.getByText('Step 1, Step 2')).toBeInTheDocument();
    });

    test("opens the rating modal on button click", async () => {
        axios.get
            .mockResolvedValueOnce({ data: { data: mockRecipe } })  // Recipe data
            .mockResolvedValueOnce({ data: { data: mockRatings } }); // Ratings data

        renderWithProviders(<RecipeDetails />, { reduxStore: store });

        // Click on the rate button
        fireEvent.click(await screen.findByTestId("rateButton")); 

        // Check if the rating modal is open
        expect(screen.getByText(/rate this recipe/i)).toBeInTheDocument();
    });

    test("edits recipe on button click", async () => {
        //For update a particular recipe
        jest.spyOn(router, 'useParams').mockReturnValue({ id: mockRecipe._id });
        // Mocking successful responses for recipe and ratings
        axios.get
            .mockResolvedValueOnce({ data: { data: mockRecipe } })  // Recipe data
            .mockResolvedValueOnce({ data: { data: mockRatings } }); // Ratings data

        renderWithProviders(<RecipeDetails />, { reduxStore: store });

        // Wait for the edit button to be available
        const editButton = await screen.findByTestId("editButton");

        // Click the edit button
        fireEvent.click(editButton); 

        // Verify navigation to the edit page
        expect(mockNavigate).toHaveBeenCalledWith(`/editRecipe/${mockRecipe._id}`);
    });

    test("deletes recipe on button click", async () => {
        // Mock the useParams hook to return the recipe ID
        jest.spyOn(router, 'useParams').mockReturnValue({ id: mockRecipe._id });
    
        // Mocking successful responses for recipe and ratings
        axios.get
            .mockResolvedValueOnce({ data: { data: mockRecipe } })  // Recipe data
            .mockResolvedValueOnce({ data: { data: mockRatings } }); // Ratings data
    
        renderWithProviders(<RecipeDetails />, { reduxStore: store });
    
        // Wait for the delete button to be available
        const deleteButton = await screen.findByTestId("deleteButton");
    
        // Mock the delete response
        axios.delete.mockResolvedValueOnce({"success": true, "message": "Recipe deleted successfully", "data": null});
    
        // Click the delete button
        fireEvent.click(deleteButton); 
    
        // Wait for the navigation to occur
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/recipes');
        });
    });  
});

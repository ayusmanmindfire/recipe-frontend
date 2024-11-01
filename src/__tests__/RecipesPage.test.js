//Third party imports
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import axios from "axios";
import * as router from "react-router"
import * as reactCookie from 'react-cookie';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import configureStore from 'redux-mock-store';

//Static imports
import RecipesPage from "../pages/Recipes/RecipesPage";
import { userDetails } from "../__mocks__/auth.mock";
import { mockRecipes, unauthorizedError } from "../__mocks__/recipes.mock";
import { recipesPageStrings } from "../utils/constantStrings";

//Mock axios for functions
jest.mock('axios', () => ({
    get: jest.fn()
}))

// Mock the react-cookie hooks
jest.mock('react-cookie', () => ({
    ...jest.requireActual('react-cookie'),
    useCookies: jest.fn()
}));

//Configuration for render with wrappers
const renderWithProviders = (ui, { reduxStore } = {}) => {
    return render(
        <Provider store={reduxStore}>
            <CookiesProvider>
                <Router>{ui}</Router>
            </CookiesProvider>
        </Provider>
    );
};

const mockNavigate = jest.fn();
const mockStore = configureStore([]);

describe('Recipes page component', () => {
    let store;

    beforeEach(() => {
        //redux store mock
        store = mockStore({
            user: { userDetails: userDetails },
            theme: { theme: "light" }
        });
        // Mock cookie hooks
        jest.spyOn(reactCookie, 'useCookies').mockImplementation(() => [
            { Authorization: 'mock-token' },
        ]);
        //mock for navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
        jest.clearAllMocks();
    });

    test('fetches and displays recipes on component mount', async () => {

        axios.get.mockResolvedValueOnce({ data: { data:{recipes: mockRecipes } }});

        renderWithProviders(<RecipesPage />, { reduxStore: store });

        await waitFor(() => {
            // Confirm that the recipes are rendered
            expect(screen.getByText('Recipe 1')).toBeVisible();
            expect(screen.getByText('Recipe 2')).toBeVisible();
        });
    });


    test('displays error page on 401 error', async () => {
        axios.get.mockRejectedValueOnce(unauthorizedError);

        renderWithProviders(<RecipesPage />, { reduxStore: store });

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/error'));
    });

    test('displays no recipes found', async () => {
        axios.get.mockResolvedValueOnce([]);

        renderWithProviders(<RecipesPage />, { reduxStore: store });

        await waitFor(() => {
            expect(screen.getByText(/no recipes found/i)).toBeVisible();
        });
    });

    test('searches for recipes based on query input', async () => {

        // Mock initial fetch with all recipes
        axios.get.mockResolvedValueOnce({ data: { data:{recipes: mockRecipes } }});

        renderWithProviders(<RecipesPage />, { reduxStore: store });

        // Wait for initial recipes to load
        await waitFor(() => {
            expect(screen.getByText('Recipe 1')).toBeInTheDocument();
            expect(screen.getByText('Recipe 2')).toBeInTheDocument();
        });
        // Set query and mock search result
        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Recipe 1' } });

        // Mock API response for search
        axios.get.mockResolvedValueOnce({ data: { data: [mockRecipes[0]] } });

        // Trigger search
        fireEvent.click(screen.getByText(recipesPageStrings.searchButton));

        // Verify search result
        await waitFor(() => {
            expect(screen.getByText('Recipe 1')).toBeInTheDocument();
            expect(screen.queryByText('Recipe 2')).not.toBeInTheDocument(); // Ensure "Recipe 2" is not visible
        });
    });

    test('navigates to add recipe page on button click', async () => {
        // Mock initial fetch with all recipes
        axios.get.mockResolvedValueOnce({ data: { data:{recipes:mockRecipes }} });

        renderWithProviders(<RecipesPage />, { reduxStore: store });
        // Wait for the add recipe button to be rendered
        await waitFor(() => {
            expect(screen.getByText(recipesPageStrings.addRecipeButton)).toBeInTheDocument();
        });
        // Click the add recipe button
        fireEvent.click(screen.getByText(recipesPageStrings.addRecipeButton));

        // Verify navigation was called
        expect(mockNavigate).toHaveBeenCalledWith('/addRecipe');
    });

})
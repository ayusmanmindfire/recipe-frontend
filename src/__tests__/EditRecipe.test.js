// React and third-party imports
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from 'redux-mock-store';
import axios from "axios";
import * as router from "react-router";

// Static imports
import EditRecipePage from "../pages/Recipes/EditRecipePage";
import { userDetails } from "../__mocks__/auth.mock";
import { editRecipeStrings } from "../utils/constantStrings";
import { mockRecipe, mockRecipePayload } from "../__mocks__/recipes.mock";

// Mock dependencies
jest.mock('axios', () => ({
    put: jest.fn(),
    get: jest.fn(),
}));

// Mock useNavigate and useCookies
const mockNavigate = jest.fn();
const mockStore = configureStore([]);
jest.mock('react-cookie', () => ({
    ...jest.requireActual('react-cookie'),
    useCookies: jest.fn()
}));

// Helper function to render component with providers
const renderWithProviders = (ui, { reduxStore } = {}) => {
    return render(
        <Provider store={reduxStore}>
            <CookiesProvider>
                <Router>{ui}</Router>
            </CookiesProvider>
        </Provider>
    );
};

describe('EditRecipePage Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: { userDetails: userDetails },
            theme: { theme: "light" }
        });
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
        useCookies.mockImplementation(() => [{ Authorization: 'mock-token' }]);
        jest.clearAllMocks();
    });

    test('renders EditRecipePage component', () => {
        renderWithProviders(<EditRecipePage />, { reduxStore: store });
        expect(screen.getByText(editRecipeStrings.editRecipe)).toBeInTheDocument();
    });

    test('navigates to login if token is missing', () => {
        useCookies.mockImplementation(() => [{}]);  // Return empty token
        renderWithProviders(<EditRecipePage />, { reduxStore: store });
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test("loads existing recipe data correctly", async () => {
        axios.get.mockResolvedValueOnce({ data: { success: true, data: mockRecipe } });

        renderWithProviders(<EditRecipePage />, { reduxStore: store });

        // Wait for the component to load and populate the form fields
        await waitFor(() => {
            expect(screen.getByPlaceholderText(/Enter the title/i)).toHaveValue(mockRecipe.title);
            expect(screen.getByPlaceholderText(/Enter steps/i)).toHaveValue(mockRecipe.steps);
            expect(screen.getByPlaceholderText(/Ingredient 1/i)).toHaveValue(mockRecipe.ingredients[0]);
        });
    });

    test("displays validation errors when fields are empty", async () => {
        renderWithProviders(<EditRecipePage />, { reduxStore: store });
        // Submit empty form
        fireEvent.click(screen.getByRole("button", { name: /Add Recipe/i }));

        // Check for validation error messages
        await waitFor(() => {
            expect(screen.getByText("Title is required")).toBeVisible();
            expect(screen.queryByText("Steps are required")).toBeVisible();
            expect(screen.queryByText("Image file is required")).toBeVisible();
        });
    });

    test("submits form data and navigates to recipes page on success", async () => {
        axios.get.mockResolvedValueOnce({ data: { success: true, data: mockRecipe } });
        axios.put.mockResolvedValueOnce({ data: { success: true, data: mockRecipe } });

        renderWithProviders(<EditRecipePage />, { reduxStore: store });

        // Fill out form fields with new data
        fireEvent.change(screen.getByPlaceholderText(/Enter the title/i), {
            target: { value: mockRecipePayload.title },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter steps/i), {
            target: { value: mockRecipePayload.steps },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingredient 1/i), {
            target: { value: mockRecipePayload.ingredients[0] },
        });

        // Mock a file upload
        const file = new File(["image"], "recipe.jpg", { type: "image/jpg" });
        await waitFor(() => expect(screen.getByTestId("image-upload")).toBeInTheDocument());
        fireEvent.change(screen.getByTestId("image-upload"), { target: { files: [file] } });

        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Update Recipe/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/recipes'); // Ensure navigation to /recipes
        });
    });

    test("displays API error message when update fails", async () => {
        const errorMessage = "Failed to update recipe";
        
        axios.get.mockResolvedValueOnce({ data: { success: true, data: mockRecipe } });
        axios.put.mockRejectedValueOnce({
            response: { data: { message: errorMessage } }
        });
    
        renderWithProviders(<EditRecipePage />, { reduxStore: store });
    
        // Fill out form fields
        fireEvent.change(screen.getByPlaceholderText(/Enter the title/i), {
            target: { value: mockRecipePayload.title },
        });
        fireEvent.change(screen.getByPlaceholderText(/Enter steps/i), {
            target: { value: mockRecipePayload.steps },
        });
        fireEvent.change(screen.getByPlaceholderText(/Ingredient 1/i), {
            target: { value: mockRecipePayload.ingredients[0] },
        });
    
        // Mock a file upload
        const file = new File(["image"], "recipe.jpg", { type: "image/jpg" });
        await waitFor(() => expect(screen.getByTestId("image-upload")).toBeInTheDocument());
        fireEvent.change(screen.getByTestId("image-upload"), { target: { files: [file] } });
    
        // Submit the form
        fireEvent.click(screen.getByRole("button", { name: /Update Recipe/i }));
    
        // Wait for error message to appear
        await waitFor(() => {
            expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
    
        // Ensure navigation to /recipes does not happen
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});

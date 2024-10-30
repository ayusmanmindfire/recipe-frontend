// React and third-party imports
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

// Static imports
import LandingPage from "../pages/Common/LandingPage";
import { landingPageStrings } from "../utils/constantStrings";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe('LandingPage Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        // Set up the mock for useNavigate
        useNavigate.mockImplementation(() => mockNavigate);
    });

    test('renders LandingPage with the correct header and text', () => {
        render(<LandingPage />);

        // Check for header text
        expect(screen.getByText(landingPageStrings.homeHeader)).toBeInTheDocument();

        // Check for main text
        expect(screen.getByText(landingPageStrings.homeText)).toBeInTheDocument();

        // Check for buttons
        expect(screen.getByRole('button', { name: /Sign UP/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Go to recipes/i })).toBeInTheDocument();
    });

    test('navigates to the signup page when Sign UP button is clicked', () => {
        render(<LandingPage />);

        // Click the Sign UP button
        fireEvent.click(screen.getByRole('button', { name: /Sign UP/i }));

        // Ensure navigate function is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });

    test('navigates to the recipes page when Go to recipes button is clicked', () => {
        render(<LandingPage />);

        // Click the Go to recipes button
        fireEvent.click(screen.getByRole('button', { name: /Go to recipes/i }));

        // Ensure navigate function is called with the correct path
        expect(mockNavigate).toHaveBeenCalledWith('/recipes');
    });

});

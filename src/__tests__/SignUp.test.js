//React imports
import React from 'react';

//Third party imports
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import * as router from 'react-router';

//Static imports
import SignUp from '../pages/Auth/SignUp';
import { invalidPayload, signUpMockErrorResponse, signUpMockSuccessResponse, validPayload } from '../__mocks__/auth.mock';

//Mock for axios functions
jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn(),
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

describe('SignUp Component', () => {
    let store;

    beforeEach(() => {
        //redux store mock
        store = mockStore({
            user: { userDetails: null },
        });

        //mock for navigation
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
        jest.clearAllMocks();
    });

    test('renders sign up form correctly', () => {
        renderWithProviders(<SignUp />, { reduxStore: store });

        expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    test('validates form inputs', async () => {
        renderWithProviders(<SignUp />, { reduxStore: store });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Check for validation error messages
        expect(await screen.findByText(/username cannot be empty/i)).toBeVisible();
        expect(await screen.findByText(/email is required/i)).toBeVisible();
        expect(await screen.findByText(/password is required/i)).toBeVisible();

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: invalidPayload.username },
        });
        fireEvent.change(screen.getByPlaceholderText(/email address/i), {
            target: { value: invalidPayload.email },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: invalidPayload.password},
        });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Check for validation error messages
        expect(await screen.findByText(/must be between 3 to 40 characters/i)).toBeVisible();
        expect(await screen.findByText(/invalid email address/i)).toBeVisible();
        expect(await screen.findByText(/password should be 8-30 characters and contain at least one special character/i)).toBeVisible();
    });

    test('handles API error on registration', async () => {
        axios.post.mockRejectedValueOnce(signUpMockErrorResponse);

        renderWithProviders(<SignUp />, { reduxStore: store });

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: validPayload.username },
        });
        fireEvent.change(screen.getByPlaceholderText(/email address/i), {
            target: { value: validPayload.email },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: validPayload.password },
        });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(screen.getByText(/email already exists/i)).toBeVisible();
        });
    });

    test('successful registration navigates to login page', async () => {
        

        axios.post.mockResolvedValueOnce(signUpMockSuccessResponse);

        renderWithProviders(<SignUp />, { reduxStore: store });

        fireEvent.change(screen.getByPlaceholderText(/username/i), {
            target: { value: validPayload.username },
        });
        fireEvent.change(screen.getByPlaceholderText(/email address/i), {
            target: { value: validPayload.email },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: validPayload.password },
        });

        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login'); // Ensure navigation to /login
        });
    });
});

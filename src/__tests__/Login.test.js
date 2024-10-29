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
import Login from '../pages/Auth/Login';
import { mockErrorResponse, mockSuccessResponse, mockUserResponse } from '../__mocks__/auth.mock';
import { invalidPayload, validPayload } from '../__mocks__/auth.mock';

//mock for axios functions
jest.mock('axios', () => ({
    post: jest.fn(),
    get: jest.fn(),
}));

//configuration for render with wrapper
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
// Mock Redux store
const mockStore = configureStore([]);
describe('Login Component', () => {
    let store;
    let dispatchMock;   

    beforeEach(() => {
        //redux mock
        store = mockStore({
            user: { userDetails: null },
        });
        dispatchMock = jest.fn();
        store.dispatch = dispatchMock;

        //use-navigate mock
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);
        jest.clearAllMocks();
    });

    test('renders login form correctly', () => {
        renderWithProviders(<Login />, { reduxStore: store });

        expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test('validates form inputs', async () => {
        renderWithProviders(<Login />, { reduxStore: store });

        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        // Check for validation error messages
        expect(await screen.findByText(/email is required/i)).toBeVisible();
        expect(await screen.findByText(/password is required/i)).toBeVisible();

        fireEvent.change(screen.getByPlaceholderText(/email address/i), {
            target: { value: invalidPayload.email},
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: invalidPayload.password },
        });

        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        // Check for validation error messages
        expect(await screen.findByText(/invalid email address/i)).toBeVisible();
        expect(await screen.findByText(/password should be 8-30 characters and contain at least one special character/i)).toBeVisible();
    });

    test('handles API error on login', async () => {
        axios.post.mockRejectedValueOnce(mockErrorResponse);

        renderWithProviders(<Login />, { reduxStore: store });

        fireEvent.change(screen.getByPlaceholderText(/email address/i), {
            target: { value: validPayload.email },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
            target: { value: validPayload.password },
        });

        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(screen.getByText(/user not found/i)).toBeVisible();
        });
    });

    test('successful login navigates to recipes page with token', async () => {

    axios.post.mockResolvedValueOnce(mockSuccessResponse); // Mock login API response
    axios.get.mockResolvedValueOnce(mockUserResponse); // Mock verify token API response

    // Render the Login component and fill out the form
    renderWithProviders(<Login />, { reduxStore: store });

    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
        target: { value: validPayload.email },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: validPayload.password },
    });

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    //Check that the navigation happened
    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/recipes'); // Ensure the user is navigated to /recipes
    });
});

});

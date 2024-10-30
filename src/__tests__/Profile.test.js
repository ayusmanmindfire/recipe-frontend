import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Profile from '../pages/Auth/Profile';
import { profileStrings } from '../utils/constantStrings';
import { clearUserDetails } from '../redux/userSlice';
import * as router from 'react-router';
import * as reactCookie from 'react-cookie';
import { userDetails } from '../__mocks__/auth.mock';

// Mock the react-cookie hooks
jest.mock('react-cookie', () => ({
  ...jest.requireActual('react-cookie'),
  useCookies: jest.fn()
}));

// Mock the redux actions
jest.mock('../redux/userSlice', () => ({
  clearUserDetails: jest.fn()
}));

const renderWithProviders = (ui, { reduxStore }) => {
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

describe('Profile Component', () => {
  let store;
  let mockRemoveCookie;

  beforeEach(() => {
    // Setup initial store state
    store = mockStore({
      user: {
        userDetails: userDetails
      },
    });

    // Mock cookie hooks
    mockRemoveCookie = jest.fn();
    jest.spyOn(reactCookie, 'useCookies').mockImplementation(() => [
      { Authorization: 'mock-token' },
      mockRemoveCookie,
    ]);

    // Mock router
    jest.spyOn(router, 'useNavigate').mockImplementation(() => mockNavigate);

    // Setup dispatch mock
    const mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('displays profile information correctly', async () => {
    renderWithProviders(<Profile />, { reduxStore: store });

    // Wait for the component to load and verify header
    await waitFor(() => {
      expect(screen.getByText(profileStrings.profileHeader)).toBeInTheDocument();
    });

    // Check user details are displayed
    expect(screen.getByText('ayusman')).toBeInTheDocument();
    expect(screen.getByText('ayusman@gmail.com')).toBeInTheDocument();
  });

  test('navigates to login if token is missing', async () => {
    // Mock missing token
    jest.spyOn(reactCookie, 'useCookies').mockImplementation(() => [
      { Authorization: null },
      mockRemoveCookie,
    ]);

    renderWithProviders(<Profile />, { reduxStore: store });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('navigates to login if userDetails are missing', async () => {
    // Setup store with missing userDetails
    const emptyStore = mockStore({
      user: {
        userDetails: null,
      },
    });

    renderWithProviders(<Profile />, { reduxStore: emptyStore });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });


  test('handles logout correctly', async () => {
    // Render the component
    renderWithProviders(<Profile />, { reduxStore: store });

    // Wait for the component to load completely
    await waitFor(() => {
      expect(screen.getByText(profileStrings.profileHeader)).toBeInTheDocument();
    });

    // Find and click logout button
    const logoutButton = screen.getByText(profileStrings.logout);
    expect(logoutButton).toBeInTheDocument();
    
    // Click the logout button
    fireEvent.click(logoutButton);

    // Verify logout sequence
    await waitFor(() => {
      // Check cookie removal
      expect(mockRemoveCookie).toHaveBeenCalledWith('Authorization');
      
      // Check user details cleared
      expect(clearUserDetails).toHaveBeenCalled();
      
      // Check navigation
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    }, { timeout: 3000 }); // Increase timeout if needed
  });

  
  test('navigates to login page on fetch failure from store', async () => {
    // Create a store that will trigger an error
    const errorStore = mockStore({
      user: {
        userDetails: null // This will cause the fetch to fail
      },
    });

    // Render component with error-triggering store
    renderWithProviders(<Profile />, { reduxStore: errorStore });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

  });
});
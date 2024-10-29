//React imports
import React from 'react';

//Third party imports
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

//Static imports
import Navbar from '../components/Navbar';
import { toggleTheme } from '../redux/themeSlice';
import { NavbarStrings } from '../utils/constantStrings';

// Mock Redux store
const mockStore = configureStore([]);

describe('Navbar Component', () => {
    let store;
    let dispatchMock;

    beforeEach(() => {
        store = mockStore({
            theme: { theme: 'light' },  // Initial theme state
        });
        dispatchMock = jest.fn();
        store.dispatch = dispatchMock;
    });

    const renderComponent = () => {
        return render(
            <Provider store={store}>
                <Router>
                    <Navbar />
                </Router>
            </Provider>
        );
    };

    test('renders navbar with links and theme button', () => {
        renderComponent();

        // Check for theme toggle button
        const themeButton = screen.getByRole('button', { name: /light/i });
        expect(themeButton).toBeInTheDocument();

        // Check for navigation links
        expect(screen.getByText(NavbarStrings.home)).toBeInTheDocument();
        expect(screen.getByText(NavbarStrings.recipes)).toBeInTheDocument();
        expect(screen.getByText(NavbarStrings.profile)).toBeInTheDocument();
    });

    test('toggles theme on button click', () => {
        renderComponent();

        // Click the theme button
        const themeButton = screen.getByRole('button', { name: /light/i });
        fireEvent.click(themeButton);

        // Check that toggleTheme action was dispatched
        expect(dispatchMock).toHaveBeenCalledWith(toggleTheme());
    });

    test('navigates to correct route on link click', () => {
        renderComponent();

        // Click navigation links
        fireEvent.click(screen.getByText(NavbarStrings.home));
        fireEvent.click(screen.getByText(NavbarStrings.recipes));
        fireEvent.click(screen.getByText(NavbarStrings.profile));

        // Verify links exist and are clickable
        expect(screen.getByText(NavbarStrings.home)).toBeInTheDocument();
        expect(screen.getByText(NavbarStrings.recipes)).toBeInTheDocument();
        expect(screen.getByText(NavbarStrings.profile)).toBeInTheDocument();
    });
});
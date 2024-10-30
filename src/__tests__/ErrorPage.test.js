// React and third-party imports
import { render, screen } from "@testing-library/react";

// Static imports
import ErrorPage from "../pages/Common/ErrorPage";
import { errorStrings } from "../utils/constantStrings";
import { imagePaths } from "../utils/imageImports";

// Test suite for ErrorPage component
describe('ErrorPage Component', () => {
    test('renders ErrorPage with the correct message and image', () => {
        const errorMessage = "Something went wrong";

        render(<ErrorPage message={errorMessage} />);

        // Check for the specific error message
        expect(screen.getByText(errorStrings.wentWrong)).toBeInTheDocument();

        // Check for the error image
        const image = screen.getByAltText(""); // Assuming no alt text is provided
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', imagePaths.errorImage); // Verify the image source
    });
});

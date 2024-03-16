import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './ErrorPage';

describe("Error tests suite.",()=>{
    it("should display Error message",()=>{
        
        render(<Error />);
        const element = screen.getByText("Something went wrong. Please try again later.");
        expect(element).toBeInTheDocument();
    })
})


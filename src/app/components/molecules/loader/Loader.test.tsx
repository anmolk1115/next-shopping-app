import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Loader from './Loader';

describe("Loader tests suite.",()=>{
    it("should display Loader message",()=>{
        
        render(<Loader />);
        const element = screen.getByText("Loading, Please wait...");
        expect(element).toBeInTheDocument();
    })
})


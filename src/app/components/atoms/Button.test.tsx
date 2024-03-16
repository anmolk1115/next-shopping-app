import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import Button from './Button';

describe("Button Test suite",()=>{
    it("should display label and fire onClick event",()=>{
        const btnClicked= jest.fn();
        render(<Button label='Ok' onClick={btnClicked} />);
        const element = screen.getByText("Ok");
        expect(element).toBeInTheDocument();
        userEvent.click(element);
    })
})


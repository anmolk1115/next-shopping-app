import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './Header';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe("Header tests suite.",()=>{
    it("should display website title in header component",()=>{
        render(<Header />);
        const element = screen.getByText("PO Ecommerce");
        expect(element).toBeInTheDocument();
    })
})


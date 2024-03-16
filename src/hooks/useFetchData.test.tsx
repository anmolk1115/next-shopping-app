import { renderHook, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import useFetchData from "./useFetchData";
import { mockFetch } from './mock-fetch';

describe("useFetchData Test suite.", () => {
    let mockedData:{};
    
    beforeEach(() => {
      mockedData = {"id":1,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops","price":109.95,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday","category":"men's clothing","image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","rating":{"rate":3.9,"count":120}}
      
      jest.fn().mockImplementation(() => Promise.resolve(mockedData));
      window.fetch = mockFetch(mockedData);
    });

    it("should return initial values for loading, data and error", async () => {
      const { result } = renderHook(() => useFetchData("/products/1"));
      const { data, error, loading } = result.current;
  
      expect(data).toBe(undefined);
      expect(error).toBe(null);
      expect(loading).toBe(true);
    });

    it("should return data", async () => {
        const { result } = renderHook(() => useFetchData("/products/1"));
    
        await waitFor(() =>
          expect(result.current).toEqual({
            data: mockedData,
            error: null,
            loading: false,
          })
        );
      });
  });
  
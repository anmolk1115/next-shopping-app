'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import HeaderSection from './HeaderSection';

const Header = () => {
    return (
        <Provider store={store}>
            <HeaderSection />
        </Provider>
    )
}

export default Header;
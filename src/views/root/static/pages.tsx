import React from 'react';

import RootI from '../types.ts';

import Akt from '../pages/akt/Akt.tsx';
import Anket from '../pages/anket/Anket.tsx';
import Auth from '../pages/auth/Auth.tsx';
import Cheque from '../pages/cheque/Cheque.tsx';
import Faq from '../pages/faq/Faq.tsx';
import FullAnket from '../pages/fullAnket/FullAnket.tsx';
import Index from '../pages/index/Index.tsx';
import Products from '../pages/products/Products.tsx';
import Profile from '../pages/profile/Profile.tsx';
import Winners from '../pages/winners/Winners.tsx';

const pages = {
    index: {
        render(this: RootI) {
            return <Index />;
        },
    },
    anket: {
        render(this: RootI) {
            return <Anket />;
        },
    },
    'full-anket': {
        render(this: RootI) {
            return <FullAnket />;
        },
    },
    act: {
        render(this: RootI) {
            return <Akt />;
        },
    },
    products: {
        render(this: RootI) {
            return <Products />;
        },
    },
    faq: {
        render(this: RootI) {
            return <Faq />;
        },
    },
    winners: {
        render(this: RootI) {
            return <Winners />;
        },
    },
    profile: {
        render(this: RootI) {
            return <Profile />;
        },
    },
    auth: {
        render(this: RootI) {
            return <Auth />;
        },
    },
    cheque: {
        render(this: RootI) {
            return <Cheque />;
        },
    },
} as const;

export default pages;

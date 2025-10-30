import React from 'react';

import RootI from '../types.ts';

import Login from '../pages/login/Login.tsx';
import Reg from '../pages/reg/Reg.tsx';

const pages = {
    'auth-login': {
        render(this: RootI) {
            return (
                <>
                    <Login />
                </>
            );
        },
    },
    'auth-reg': {
        render(this: RootI) {
            return (
                <>
                    <Reg />
                </>
            );
        },
    },
    'auth-password': {
        render(this: RootI) {
            return (
                <>
                    <Reg />
                </>
            );
        },
    },
} as const;

export default pages;

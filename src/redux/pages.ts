import { StoreT } from '@global/types';

const pages = [
    {
        links: ['', undefined],
        name: 'index',
        content: 'Главная',
    },
    {
        links: ['404'],
        name: '404',
    },
    {
        links: ['faq'],
        name: 'faq',
        content: 'Вопрос-ответ',
    },
    {
        links: ['products'],
        name: 'products',
        content: 'О продукте',
    },
    {
        links: ['cheque'],
        name: 'cheque',
        isPopup: true,
        mainPage: 'index',
        getCond: ({ user }: StoreT) => ({
            condition: !!user,
        }),
        getRedirect: () => ({ name: 'auth' }),
    },
    {
        links: ['anket'],
        name: 'anket',
        getCond: ({ user }: StoreT) => ({
            condition: !!user,
        }),
        getRedirect: () => ({ name: 'auth' }),
    },
    {
        links: ['full-anket'],
        name: 'full-anket',
        getCond: ({ user }: StoreT) => ({
            condition: !!user,
        }),
        getRedirect: () => ({ name: 'auth' }),
    },
    {
        links: ['profile'],
        name: 'profile',
        content: 'Личный кабинет',
        getCond: ({ user }: StoreT) => ({
            condition: !!user && user.status !== 'EMAIL_CONFIRM_REQUIRED',
        }),
        getRedirect: ({ user }: StoreT) => {
            if (user?.status === 'EMAIL_CONFIRM_REQUIRED') {
                return { name: 'auth-reg' };
            }

            return { name: 'auth' };
        },
    },
    {
        links: ['auth'],
        name: 'auth',
        getCond: ({ user, loginProcess }: StoreT) => ({
            condition: !user || user.status === 'EMAIL_CONFIRM_REQUIRED' || loginProcess,
        }),
        getRedirect: () => ({ name: 'profile' }),
        isPopup: true,
        mainPage: 'index',
    },
    {
        links: ['', undefined],
        name: 'auth-login',
        level: 1,
        parentName: 'auth',
        getCond: ({ user, loginProcess }: StoreT) => ({
            condition: !user || loginProcess,
        }),
        getRedirect: () => ({ name: 'profile' }),
    },
    {
        links: ['reg'],
        name: 'auth-reg',
        level: 1,
        parentName: 'auth',
    },
    {
        links: ['password'],
        name: 'auth-password',
        level: 1,
        parentName: 'auth',
    },
] as const;

export default pages;

import pages from '@redux/pages.ts';

import UserT from './models/User';

declare global {
    interface Window {
        widthValue: number;
        heightValue: number;
        mediaM: number;
        widthPrevValue: number;
        heightPrevValue: number;
        socAuthUrls: Record<string, string>;
        closeGamePopup: () => void;
        registerBill: () => void;
        gameId: 'VIBE' | 'SPOTLIGHTS' | 'MATCH' | 'STAGE' | 'FIVE';
        saveJWT: (JWT: string) => void;
        getJWT: () => string | undefined;
        Telegram?: {
            WebApp?: {
                close: () => void;
            };
        };
        ym?: (key: number, name: string, text: string) => void;
        scrollGoals: Record<string, boolean>;
        advcake_data?: any[];
        fivepost?: any;
    }

    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_SEO: string;
            REACT_APP_API: string;
        }
    }

    type ObjT = Record<any, unknown>;

    type ResponseT<T = {}> = {
        result: 'OK';
        JWT?: string;
        data?: T;
    };

    type ResponseErrorT = {
        JWT?: string;
        errorText: string;
        result: 'ERROR';
        value: string;
    };

    type HeaderContentT = {
        menu: {
            item1: {
                title: string;
                url: string;
            };
            item2: {
                title: string;
                url: string;
            };
            item3: {
                title: string;
                url: string;
            };
            item4: {
                title: string;
                url: string;
            };
            item5: {
                title: string;
                url: string;
            };
            item6: {
                title: string;
                url: string;
            };
        };
        logos: {
            whiskas: {
                title: string;
                url: string;
                thumb: string;
            };
            magnit: {
                title: string;
                url: string;
                thumb: string;
            };
        };
        buttons: {
            button1: {
                title: string;
                url: string;
            };
            button2: {
                title: string;
                url: string;
            };
            button3: {
                title: string;
                url: string;
            };
        };
    };

    type FooterContentT = {
        url1: {
            title: string;
            url: string;
        };
        url2: {
            title: string;
            url: string;
        };
        url3: {
            title: string;
            url: string;
        };
        url3_5ka: {
            title: string;
            url: string;
        };
        disclaimer: {
            title: string;
            description: string;
        };
        disclaimer_5ka: {
            title: string;
            description: string;
        };

        politics: {
            title: string;
            common: string;
            anket: string;
            feedback: string;
        };
    };
}

type StorePagesT = {
    isShow: boolean;
    id?: string;
    data?: Record<string, string | number | boolean | null>;
};

type PageGetCondT = {
    condition: boolean | undefined;
};

type PageGetRedirectT = {
    name: string;
};

type PopupT<T extends {} = {}> = { isShow: boolean } & Omit<T, 'isShow'>;

type PopupsT = {
    callFormSuccess: PopupT;
};

type PopupsNamesT = keyof PopupsT;

type StoreT = {
    seoMode: boolean;
    device: 'mobile' | 'desktop';
    pages: Record<(typeof pages)[number]['name'], StorePagesT>;
    windowWidth: number | undefined;
    windowHeight: number | undefined;
    windowIsLoad?: boolean | undefined;
    windowIsReady?: boolean | undefined;
    rootInit?: boolean;
    isLoadFonts?: boolean;
    isInputFocus?: boolean;
    levels: string[];
    pagesIds: Record<string, number>;
    loginProcess?: boolean;
    user?: UserT;
    acceptCookies: boolean;
    canLoadImages: Partial<Record<'1' | '2' | '3', string>>;
    isChatbot?: boolean;
} & PopupsT;

type PageNamesT = keyof StoreT['pages'];

type PagesT = {
    links: readonly (string | undefined)[];
    name: keyof StoreT['pages'];
    level?: number;
    parentName?: PageNamesT;
    isPopup?: boolean;
    content?: string;
    group?: string;
    className?: string;
    mainPage?: string | ((data: StoreT) => string);
    getCond?: (data: StoreT) => { condition: boolean | undefined };
    getRedirect?: (data: StoreT) => { name: string };
};

type ListenerT<T = MouseEvent | TouchEvent> = (
    event: string,
    listener: (event: T) => void,
    options?: {
        passive?: boolean;
        once?: boolean;
        capture?: boolean;
    },
) => void;

type CustomListenerT = (
    event: string,
    listener: (event: CustomEvent) => void,
    options?: {
        passive?: boolean;
        once?: boolean;
        capture?: boolean;
    },
) => void;

export type {
    StorePagesT,
    StoreT,
    PagesT,
    PageGetCondT,
    PageGetRedirectT,
    ListenerT,
    CustomListenerT,
    PageNamesT,
    PopupsT,
    PopupsNamesT,
};

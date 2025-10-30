import getPage from '@functions/getPage.ts';

import I, { NavItemT } from '../types.ts';

const getNav: I['getNav'] = function () {
    const nav: (Omit<NavItemT, 'text'> & { text?: string })[] = [];

    nav.push({ name: 'index', pageName: 'index' });
    nav.push({ name: 'rules', text: 'КАК УЧАСТВОВАТЬ', ancor: 'rules' });
    nav.push({ name: 'prizes', text: 'ПРИЗЫ', ancor: 'prizes' });
    // nav.push({ name: 'winners', pageName: 'winners' });
    nav.push({ name: 'faq', pageName: 'faq' });
    nav.push({ name: 'profile', pageName: 'profile' });

    return nav.map((item) => ({
        ...item,
        text: item.text!,
        ...(item.pageName
            ? {
                  text: getPage({ name: item.pageName }).content!,
              }
            : {}),
    }));
};

export default getNav;

import { PagesT, StorePagesT } from '../global/types.ts';

import { store } from '../redux/redux.ts';
import getPage from './getPage.ts';
import getPageInfo from './getPageInfo.ts';
import getPageLevel from './getPageLevel.ts';

type PropsT = {
    name: string;
    storePages?: {
        [s: string]: StorePagesT;
    };
    ids?: {
        [s: number]: string;
    };
};

export default function getPageLink({ name, storePages, ids = {} }: PropsT): string {
    const page: PagesT = getPage({ name });

    if (!storePages) {
        storePages = store.getState().pages;
    }

    if (page) {
        const pageInfo = getPageInfo({ name });
        const link =
            page.links.find((loopLink) => !['', undefined].includes(loopLink)) ||
            page.links.find((loopLink) => loopLink !== undefined);
        let resultLink = link;

        if (resultLink === undefined) {
            resultLink = ids[getPageLevel(page)] ?? storePages?.[name]?.id;
        }

        let nearParent = pageInfo.nearParent;

        while (nearParent) {
            let parentLink =
                nearParent.links.find((loopLink) => !['', undefined].includes(loopLink)) ||
                nearParent.links.find((loopLink) => loopLink !== undefined);

            if (parentLink === undefined) {
                parentLink = ids[getPageLevel(nearParent)] ?? storePages?.[nearParent.name]?.id;
            }

            resultLink = `${parentLink}/${resultLink}`;

            nearParent = getPageInfo({ name: nearParent.name }).nearParent;
        }

        return resultLink;
    }

    return '';
}

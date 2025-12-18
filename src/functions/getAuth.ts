import { enums } from '@global/enums';
import UserT from '@global/models/User';
import { PageNamesT } from '@global/types';
import { dispatcher } from '@redux/redux';
import { logoutActions } from '@requests/logout';

import changePage from './changePage';
import { getCookie } from './cookies';
import AxiosInst from './initAxios';

export default async function getAuth(redirect?: boolean): Promise<UserT | undefined> {
    if (!getCookie(enums.ACCESS_TOKEN)) {
        if (localStorage.getItem(enums.USER)) {
            await logoutActions();
        }

        if (localStorage.getItem('forgetEmail')) {
            // await changePage({ pageName: 'forget' });
        }

        return;
    }

    localStorage.removeItem('forgetEmail');

    let response;

    try {
        response = await AxiosInst.get<{}, ResponseT<UserT>>('/GetParticipantInfo');
    } catch (e) {
        await logoutActions();

        return;
    }

    const user = response.data;

    if (!user) {
        await logoutActions();

        return;
    }

    if (user?.personal.phone && user?.personal.phone.length === 11) {
        user.personal.phone = user.personal.phone.slice(1);
    }

    await dispatcher({ type: 'user', data: user });

    localStorage.setItem(enums.USER, JSON.stringify(user));
    let pageName: PageNamesT | undefined;
    let ids;

    if (user?.status === 'ANKET_REQUIRED') {
        pageName = 'anket';
    }

    if (user?.status === 'EXTRA_ANKET_REQUIRED') {
        pageName = 'full-anket';
    }

    if (user?.status === 'ACT_REQUIRED') {
        const prize = user.prizes?.find(
            (thisPrize) => thisPrize.userPrizeId === user.nextActPrizeId,
        );
        // const prize = user.prizes?.find((thisPrize) => thisPrize.actRequired);

        if (prize) {
            pageName = 'akt-inner';
            ids = { '1': prize.id };
        }
    }

    if (user?.status === 'EMAIL_CONFIRM_REQUIRED') {
        pageName = 'auth-reg';
    }

    if (redirect) {
        if (!pageName) {
            pageName = 'profile';
        }
    }

    if (pageName) {
        await changePage({ pageName, ids });
    }

    return user;
}

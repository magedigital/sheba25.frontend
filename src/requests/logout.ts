import changePage from '@functions/changePage';
import { deleteCookie, getCookie } from '@functions/cookies';
import AxiosInst from '@functions/initAxios';
import { deleteLocalContent } from '@functions/localContent';
import { deletePageScroll } from '@functions/savePageScroll';
import { enums } from '@global/enums';
import { dispatcher } from '@redux/redux';

const logoutActions = async function (): Promise<void> {
    await dispatcher({ type: 'loginProcess', data: true });
    await changePage({ pageName: 'index' });
    await changePage({ pageName: 'auth' });
    
    deleteLocalContent('profileData');
    deleteLocalContent('profileContent');
    deletePageScroll('profile');

    setTimeout(async () => {
        await dispatcher({ type: 'user', data: null });

        deleteCookie(enums.ACCESS_TOKEN);
        localStorage.removeItem(enums.USER);
    }, 300);
};

export default async function logout(): Promise<void> {
    if (!getCookie(enums.ACCESS_TOKEN)) {
        return;
    }

    let response;

    try {
        response = await AxiosInst.get<{}, ResponseT>('/Logout');
    } catch (e) {
        return;
    }

    if (response.result === 'OK') {
        await logoutActions();
    }
}
export { logoutActions };

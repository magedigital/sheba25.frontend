import { getCookie } from '@functions/cookies';
import getAuth from '@functions/getAuth';
import AxiosInst from '@functions/initAxios';
import { enums } from '@global/enums';
import { dispatcher } from '@redux/redux';

const loginActions = async function () {
    await dispatcher({ type: 'loginProcess', data: true });
    await getAuth(true);

    setTimeout(() => {
        dispatcher({ type: 'loginProcess', data: false });
    }, 300);
};

type ParamsT = {
    login: string;
    password: string;
};

export default async function login({ ...props }: ParamsT): Promise<void> {
    if (getCookie(enums.ACCESS_TOKEN)) {
        return;
    }

    let response;

    try {
        response = await AxiosInst.post<{}, ResponseT>('/Login', {
            login: props.login,
            password: props.password,
        });
    } catch (e) {
        return Promise.reject(e);
    }

    if (response.result === 'OK') {
        await loginActions();
    }
}
export { loginActions };

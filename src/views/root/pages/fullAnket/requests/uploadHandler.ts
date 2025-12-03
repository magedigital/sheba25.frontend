import getAuth from '@functions/getAuth.ts';
import AxiosInst from '@functions/initAxios.ts';
import { store } from '@redux/redux.ts';

import I from '../types.ts';

const uploadHandler: I['uploadHandler'] = async function (name, e) {
    const target = e.target;
    const formData = new FormData();

    formData.set('file', target.files![0]);
    formData.set('fileName', name);

    try {
        const response = await AxiosInst.post<{}, ResponseT>('/UploadParticipantFile', formData);

        if (response.result === 'OK') {
            await getAuth();

            const user = store.getState().user;

            if (user?.extraDataRequired?.[name]) {
                document.dispatchEvent(
                    new CustomEvent('setAnketField', {
                        detail: { name, value: user.extraDataRequired[name].value },
                    }),
                );
            }
        }
    } catch (error) {}
};

export default uploadHandler;

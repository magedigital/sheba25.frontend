import getAuth from '@functions/getAuth.ts';
import AxiosInst from '@functions/initAxios.ts';

import I from '../types.ts';

const resetAct: I['resetAct'] = async function () {
    try {
        await AxiosInst.post('/ResetParticipantInfoStatus', {});
        await getAuth(true);
    } catch (error) {}
};

export default resetAct;

import AxiosInst from '@functions/initAxios.ts';
import { setLocalContent } from '@functions/localContent.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I, { WinnersContentT, WinnersDataT } from '../types.ts';

const getContent: I['getContent'] = async function () {
    const contentResponse = await AxiosInst.get<WinnersContentT>('/content/main/');
    const dataResponse = await AxiosInst.get<WinnersDataT>('/GetWinnerList');

    setLocalContent('indexContent', contentResponse.data);
    setLocalContent('winnersData', dataResponse.data);

    await setAsyncState.call(this, {
        winnersData: dataResponse.data,
        content: contentResponse.data,
    });
};

export default getContent;

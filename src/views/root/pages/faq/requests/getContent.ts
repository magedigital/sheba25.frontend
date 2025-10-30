import AxiosInst from '@functions/initAxios.ts';
import { setLocalContent } from '@functions/localContent.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I, { FaqContentT } from '../types.ts';

const getContent: I['getContent'] = async function () {
    const response = await AxiosInst.get<FaqContentT>('/content/faq/');

    setLocalContent('faqContent', response.data);

    await setAsyncState.call(this, { content: response.data });
};

export default getContent;

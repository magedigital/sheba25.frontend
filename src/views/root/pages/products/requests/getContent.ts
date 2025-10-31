import AxiosInst from '@functions/initAxios.ts';
import { setLocalContent } from '@functions/localContent.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I, { ProductsContentT } from '../types.ts';

const getContent: I['getContent'] = async function () {
    try {
        const response = await AxiosInst.get<{}, ResponseT<ProductsContentT>>('/content/about/');

        setLocalContent('productsContent', response.data!);

        await setAsyncState.call(this, { content: response.data });

        this.sliderInit();
    } catch (error) {}
};

export default getContent;

import changePage from '@functions/changePage.ts';
import getNotPopupPage from '@functions/getNotPopupPage.ts';

import I from '../types.ts';

const close: I['close'] = function () {
    changePage({ ...getNotPopupPage() });
};

export default close;

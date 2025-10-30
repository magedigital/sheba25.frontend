import changePage from '@functions/changePage.ts';
import getNotPopupPage from '@functions/getNotPopupPage.ts';

import I from '../types.ts';

const closeHandler: I['closeHandler'] = function () {
    changePage({ ...getNotPopupPage() });
};

export default closeHandler;

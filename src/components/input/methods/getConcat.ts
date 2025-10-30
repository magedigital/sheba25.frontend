import getEndText from '@functions/getEndText.ts';

import I from '../types.ts';

const getConcat: I['getConcat'] = function (value) {
    const { concat } = this.props;

    if (!concat) {
        return value;
    }

    return typeof concat.text === 'string'
        ? concat.text
        : getEndText(+value.replace(/[^\d]/gi, ''), concat.text);
};

export default getConcat;

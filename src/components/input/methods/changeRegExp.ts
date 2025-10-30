import InputI from '../types.ts';

const changeRegExp: InputI['changeRegExp'] = function (value) {
    const { regExp, maxLen } = this.props;
    let resultValue = value;

    if (regExp) {
        resultValue = value.replace(regExp, '');
    }

    if (maxLen) {
        resultValue = resultValue.slice(0, maxLen);
    }

    return resultValue;
};

export default changeRegExp;

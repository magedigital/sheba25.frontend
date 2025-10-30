import InputI from '../types.ts';

const checkSpecChar: InputI['checkSpecChar'] = function ({ char, index }) {
    const { reg } = this.props;

    if (reg === 'phone') {
        return char === '7' && index <= 3;
    }

    return false;
};

export default checkSpecChar;

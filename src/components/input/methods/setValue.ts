import InputI, { FieldRegsT } from '../types.ts';

const setValue: InputI['setValue'] = function (value, start) {
    const { reg, concat } = this.props;
    const regInfo = this.regs[reg as FieldRegsT];

    if (regInfo) {
        const regValue = this.clearValue(value, start);

        const items = regValue.split('');
        let resultValue = '';

        regInfo.template.split('').forEach((char: string) => {
            if (char === regInfo.char) {
                const currentChar = items.shift() || undefined;

                resultValue += currentChar ?? regInfo.char;
            } else {
                resultValue += char;
            }
        });

        return resultValue;
    }

    if (concat) {
        let resultValue = this.clearValue(value || '', start);

        const text = this.getConcat(resultValue);

        if (concat.position === 'start') {
            resultValue = `${text}${resultValue}`;
        }

        if (concat.position === 'end') {
            resultValue = `${resultValue}${text}`;
        }

        return resultValue;
    }

    return value;
};

export default setValue;

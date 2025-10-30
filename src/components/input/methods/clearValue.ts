import InputI, { FieldRegsT } from '../types.ts';

const clearValue: InputI['clearValue'] = function (value, start) {
    const { reg, concat } = this.props;
    const regInfo = this.regs[reg as FieldRegsT];

    if (!value) {
        return '';
    }

    if (regInfo) {
        let resulValue = '';

        if (start) {
            resulValue = value.replace(regInfo.exp, '');

            return resulValue;
        }

        value.split('').forEach((char, index) => {
            if (char !== regInfo.template[index]) {
                resulValue += char;
            }
        });

        return resulValue;
    }

    if (concat) {
        let resultValue = value;

        if (resultValue.length < this.getConcat(resultValue).length && !start) {
            // resultValue = '';
        }

        if (resultValue && !start) {
            if (concat.position === 'start') {
                resultValue = resultValue.slice(this.getConcat(resultValue).length);
            }

            if (concat.position === 'end') {
                resultValue = resultValue.slice(
                    0,
                    resultValue.length - this.getConcat(resultValue).length,
                );
            }
        }

        if (concat.exp && resultValue) {
            resultValue = resultValue.replace(concat.exp, '');
        }

        return resultValue;
    }

    return value;
};

export default clearValue;

import InputI from '../types.ts';

const changeReg: InputI['changeReg'] = function ({ value }) {
    const { reg, concat, max, regExp, isAmount } = this.props;

    if (isAmount) {
        value = value.replace(/,/gi, '.');
        value = value.replace(/[^\d.]/gi, '');
    }

    if (typeof max === 'number' && +value.replace(/[^\d.]/gi, '') > max) {
        value = `${max.toString()}`;
    }

    if (regExp) {
        return { value: this.changeRegExp(value) };
    }

    if (reg) {
        const regInfo = this.regs[reg];

        const savedValue = this.state.value || regInfo.template;

        let resultPos;
        let action = 'add';

        let resultValue = value;

        if (savedValue.length >= value.length) {
            const chgLen = Math.abs(savedValue.length - value.length);

            action = 'delete';

            const valueItems = value.split('');

            if (typeof this.state.startPos === 'number' && typeof this.state.endPos === 'number') {
                for (let i = this.state.startPos; i < this.state.endPos - chgLen; i++) {
                    if (regInfo.template[i] !== regInfo.char) {
                        valueItems.splice(i, 1, regInfo.template[i]);
                    }
                }

                for (let i = this.state.endPos - chgLen; i < this.state.endPos; i++) {
                    valueItems.splice(i, 0, regInfo.template[i]);
                }

                resultValue = valueItems.join('');

                resultPos = this.state.endPos - chgLen;
            }
        } else {
            const realChgLen = Math.abs(savedValue.length - value.length);
            const chgLen = Math.abs(
                savedValue.replace(regInfo.exp, '').length - value.replace(regInfo.exp, '').length,
            );

            const valueItems = savedValue.split('');
            let offset = 0;
            let valOffset = 0;

            if (typeof this.state.startPos === 'number' && typeof this.state.endPos === 'number') {
                let chgValue = value.slice(this.state.startPos, this.state.startPos + realChgLen);

                if (reg === 'phone') {
                    chgValue = chgValue.replace(/[^\d+]/gi, '');

                    if ([0, 1, 2, 3, 4].includes(this.state.startPos)) {
                        if (chgValue[0] === '+' && chgValue.length === 12) {
                            valOffset += 1;

                            if (chgValue[1] === '7') {
                                valOffset += 1;
                            }
                        }

                        if (['7', '8'].includes(chgValue[0]) && chgValue.length === 11) {
                            valOffset += 1;
                        }
                    }
                }

                for (let i = this.state.startPos; i < this.state.startPos + chgLen; i++) {
                    while (
                        regInfo.template[i + offset] &&
                        regInfo.template[i + offset] !== regInfo.char
                    ) {
                        offset += 1;
                    }

                    while (value[i + valOffset] && value[i + valOffset].match(regInfo.exp)) {
                        valOffset += 1;
                    }

                    let replacedChar = value[i + valOffset];

                    if (regInfo.template[i + offset] !== regInfo.char) {
                        replacedChar = regInfo.template[i + offset];
                    }

                    if (replacedChar) {
                        valueItems.splice(i + offset, 1, replacedChar);
                    }
                }

                resultValue = valueItems.join('');

                resultPos = this.state.startPos + chgLen + offset;
            }

            if (chgLen > 1 && 0) {
                resultValue = this.setValue(resultValue);
            }
        }

        if (typeof resultPos === 'number') {
            if (
                regInfo.template[resultPos - 1] &&
                regInfo.template[resultPos - 1] !== regInfo.char &&
                action === 'delete'
            ) {
                resultPos -= 1;
            }

            if (
                regInfo.template[resultPos] &&
                regInfo.template[resultPos] !== regInfo.char &&
                action === 'add'
            ) {
                resultPos += 1;
            }

            resultValue = resultValue.slice(0, regInfo.template.length);

            resultValue = this.validateReg(resultValue);
        }

        return { value: resultValue, position: resultPos };
    }

    if (concat) {
        const savedValue = this.state.value!;
        // const realChgLen = Math.abs(savedValue.length - value.length);
        const resultValue = this.setValue(value);
        const clearedValue = this.clearValue(resultValue);
        const chgLen = -(savedValue.length - value.length);

        let position = this.state.endPos! + chgLen;

        if (concat.position === 'start' && position < this.getConcat(clearedValue).length) {
            position += this.getConcat(clearedValue).length;
        }

        return { value: resultValue, position };
    }

    const savedValue = this.state.value!;
    const chgLen = -(savedValue.length - value.length);

    const position = this.state.endPos! + chgLen;

    return { value, position };
};

export default changeReg;

import InputI, { FieldRegsT } from '../types.ts';

const focus: InputI['focus'] = function (isFocus) {
    const { name, value, reg, onChange, returnTemplate, setFocus, concat } = this.props;
    const resultValue = this.setValue((value || '').toString());
    const regInfo = this.regs[reg as FieldRegsT];
    const input = this.input.current;

    this.setState({ isFocus, ...(!value ? { value: isFocus ? resultValue : '' } : {}) }, () => {
        if (!isFocus && returnTemplate && value === regInfo.template) {
            onChange({ name, value: '' });

            this.setState({ value: '' });
        }

        if (!isFocus && concat && value === this.getConcat(value!)) {
            onChange({ name, value: '' });

            this.setState({ value: '' });
        }

        if (typeof setFocus === 'function') {
            setFocus(isFocus);
        }

        if (input) {
            setTimeout(() => {
                if (!value && regInfo) {
                    input.selectionStart =
                        regInfo.template
                            .split('')
                            .findIndex((char: string) => char === regInfo.char) || 0;
                    input.selectionEnd =
                        regInfo.template
                            .split('')
                            .findIndex((char: string) => char === regInfo.char) || 0;
                }

                if (!value && concat && concat.position === 'end') {
                    input.selectionStart = 0;
                    input.selectionEnd = 0;
                }
            }, 10);
        }
    });
};

export default focus;

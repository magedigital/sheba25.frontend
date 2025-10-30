import InputI from '../types.ts';

const change: InputI['change'] = async function (e) {
    const { name, onChange, returnTemplate } = this.props;
    const { target } = e;
    const { value } = target as HTMLInputElement;

    if (typeof onChange === 'function') {
        const { value: resultValue, position } = this.changeReg({ value });
        let returnedValue: string | number = resultValue;

        if (!returnTemplate) {
            returnedValue = this.clearValue(resultValue);
        }

        await onChange({ name, value: returnedValue }, e);

        this.setState({ value: resultValue }, () => {
            const input = this.input.current;

            if (input && position !== undefined) {
                input.selectionStart = position;
                input.selectionEnd = position;
            }

            this.setAreaHeight();
        });

        this.savePos();
    }
};

export default change;

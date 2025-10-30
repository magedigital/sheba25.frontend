import InputI from '../types.ts';

const init: InputI['init'] = function (force) {
    const { value } = this.props;

    if (value !== null && value !== undefined && (!this.isInit || force)) {
        const resultValue = value ? this.setValue(value.toString(), true) : '';

        this.setState(
            {
                value: resultValue,
                startPos: this.input.current!.selectionStart,
                endPos: this.input.current!.selectionEnd,
            },
            this.setAreaHeight.bind(this),
        );

        this.isInit = true;
    }
};

export default init;

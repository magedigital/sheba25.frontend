import InputI from '../types.ts';

const savePos: InputI['savePos'] = function () {
    const input = this.input.current;

    if (input) {
        this.setState({
            startPos: input.selectionStart,
            endPos: input.selectionEnd,
        });
    }
};

export default savePos;

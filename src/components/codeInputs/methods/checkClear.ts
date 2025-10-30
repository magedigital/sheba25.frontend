import I from '../types.ts';

const checkClear: I['checkClear'] = async function () {
    const { clearKey } = this.props;

    if (clearKey !== this.clearKey) {
        this.clearKey = clearKey;

        await this.init();

        const startInputNode = this.parent.current!.querySelector(
            `.codeInputs__item[data-key="0"] input`,
        ) as HTMLElement;

        if (startInputNode) {
            startInputNode.focus();
        }
    }
};

export default checkClear;

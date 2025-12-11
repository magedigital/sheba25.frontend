import I from '../types.ts';

const getScrollPage: I['getScrollPage'] = function () {
    const parentNode = this.parent.current;

    if (!parentNode) {
        return;
    }

    return parentNode.querySelector('.page') as HTMLElement;
};

export default getScrollPage;

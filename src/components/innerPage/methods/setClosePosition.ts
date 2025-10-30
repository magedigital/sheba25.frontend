import I from '../types.ts';

const setClosePosition: I['setClosePosition'] = function () {
    if (!this.innerClassName || !this.parent.current) {
        return;
    }

    const closeNode = this.parent.current!.querySelector('.innerPage__close') as HTMLElement;

    if (!closeNode) {
        return;
    }

    const innerNode = this.parent.current!.querySelector(`.${this.innerClassName}`) as HTMLElement;

    if (!innerNode) {
        return;
    }

    const innerWidth = innerNode.offsetWidth;

    closeNode.style.marginLeft = `${innerWidth / 2 + closeNode.offsetWidth}px`;

    if (this.getScrollPage) {
        const scrollPage = this.getScrollPage();
        const topBarNode = document.querySelector('.topBar__head') as HTMLElement;

        if (scrollPage) {
            const stopValue = topBarNode.offsetHeight - 20;

            if (scrollPage.scrollTop > stopValue && !this.state.showClose) {
                this.setState({ showClose: true });
            }

            if (scrollPage.scrollTop <= stopValue && this.state.showClose) {
                this.setState({ showClose: false });
            }
        }
    }
};

export default setClosePosition;

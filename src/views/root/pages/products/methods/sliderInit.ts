import Slider from '@classes/slider/Slider.ts';
import { store } from '@redux/redux.ts';

import I from '../types.ts';

const sliderInit: I['sliderInit'] = function () {
    const { content } = this.state;
    const slider = this.parent.current!.querySelector('.products__tabs') as HTMLElement;

    this.slider = new Slider({
        slider,
        area: slider.querySelector('.products__tabsInner')!,
        moveArea: this.parent.current!.querySelector('.products__tabsItems')!,
        itemClass: 'products__tabsItem',
        infinity: true,
        callback: async ({ current, currentKey, type }) => {
            const device = store.getState().device;

            if (type === 'startDrag') {
                this.setState({ isDrag: true });
            }

            if (type === 'endDrag') {
                this.setState({ isDrag: false });
            }

            if (typeof currentKey === 'number') {
                const currentNode = this.parent.current!.querySelector(
                    `.products__tabsItem[data-id="${current}"]`,
                ) as HTMLElement;

                this.parent.current!.querySelectorAll('[data-cur]').forEach((n) => {
                    n.removeAttribute('data-cur');
                });

                this.parent.current!.querySelectorAll('[data-vis]').forEach((n) => {
                    n.removeAttribute('data-vis');
                });

                this.parent.current!.querySelectorAll('[data-prev]').forEach((n) => {
                    n.removeAttribute('data-prev');
                });

                this.parent.current!.querySelectorAll('[data-next]').forEach((n) => {
                    n.removeAttribute('data-next');
                });

                if (currentNode) {
                    const realCurrentNode = (
                        device === 'mobile'
                            ? currentNode
                            : currentNode.nextElementSibling?.nextElementSibling
                    ) as HTMLElement;

                    if (realCurrentNode) {
                        const realCurrentId = +realCurrentNode.getAttribute('data-key')!;

                        this.setState({
                            current: realCurrentId,
                            currentId: Object.keys(content!.components.sections)[realCurrentId],
                        });

                        realCurrentNode.setAttribute('data-cur', 'true');

                        if (device === 'desktop') {
                            const elements = [
                                realCurrentNode.previousElementSibling?.previousElementSibling,
                                realCurrentNode.previousElementSibling,
                                realCurrentNode.nextElementSibling,
                                realCurrentNode.nextElementSibling?.nextElementSibling,
                            ];

                            elements.forEach((e) => {
                                if (e) {
                                    e.setAttribute('data-vis', 'true');
                                }
                            });

                            const pElements = [
                                realCurrentNode.previousElementSibling,
                                realCurrentNode.nextElementSibling,
                            ];

                            pElements.forEach((e, i) => {
                                if (e) {
                                    e.setAttribute(i === 0 ? 'data-prev' : 'data-next', 'true');
                                }
                            });
                        }
                    }
                }

                this.parent.current!.querySelectorAll('.products__tabsItem').forEach((item) => {
                    const head = item.querySelector('.products__tabsItemHead') as HTMLElement;

                    if (head) {
                        head.onclick = () => {
                            const thisCurItem = item.previousElementSibling
                                ?.previousElementSibling as HTMLElement;

                            if (thisCurItem) {
                                const itemCur = +thisCurItem.getAttribute('data-id')!;

                                this.slider!.moveToCurrentItem({ current: itemCur });
                            }
                        };
                    }
                });
            }
        },
        buttons: {
            prev: slider.querySelector('.products__tabsArrow._prev') as HTMLElement,
            next: slider.querySelector('.products__tabsArrow._next') as HTMLElement,
        },
        // notDragItems: ['.products__tabsItemHead'],
    });
};

export default sliderInit;

import Slider from '@classes/slider/Slider.ts';

import I from '../types.ts';

const sliderInit: I['sliderInit'] = function () {
    const { type } = this.props;

    if (type === 'mobile') {
        return;
    }

    const slider = this.parent.current as HTMLElement;

    this.slider = new Slider({
        slider,
        area: slider,
        moveArea: this.parent.current!.querySelector('.productsBlock__sliderItems')!,
        itemClass: 'productsBlock__sliderItem',
        infinity: true,
        buttons: {
            prev: slider.querySelector('.productsBlock__sliderArrow._prev') as HTMLElement,
            next: slider.querySelector('.productsBlock__sliderArrow._next') as HTMLElement,
        },
    });
};

export default sliderInit;

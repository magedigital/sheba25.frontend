import Slider from '@classes/slider/Slider';

import { MainContentT } from '../index/types';
import { products } from './static/products';

type PropsT = {};

type StateT = {
    isDrag?: boolean;
    content?: MainContentT;
    current?: number;
    listKey?: number;
};

interface ProductsI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    products: typeof products;
    slider?: Slider;

    parent: React.RefObject<HTMLDivElement | null>;

    sliderInit(this: ProductsI): void;

    getContent(this: ProductsI): Promise<void>;
}

export default ProductsI;

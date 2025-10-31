import Slider from '@classes/slider/Slider';

type PropsT = {};

type StateT = {
    isDrag?: boolean;
    content?: ProductsContentT;
    current?: number;
    currentId?: string;
    listKey?: number;
};

type ProductSectionT = {
    description: {
        title: {
            title: string;
            description: string;
            thumb: string;
        };
    };
    items: {
        title: string;
        thumb: string;
    }[];
};

type ProductsContentT = {
    components: {
        header: HeaderContentT;
        footer: FooterContentT;
        sections: Record<string, ProductSectionT>;
    };
};

interface ProductsI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    slider?: Slider;

    parent: React.RefObject<HTMLDivElement | null>;

    sliderInit(this: ProductsI): void;

    getContent(this: ProductsI): Promise<void>;
}

export default ProductsI;
export type { ProductsContentT };

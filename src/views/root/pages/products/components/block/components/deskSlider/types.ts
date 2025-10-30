import Slider from '@classes/slider/Slider';

type PropsT = {
    items: { thumb: string; title: string }[];
    type?: 'mobile';
    listCb?: () => void;
};

type StateT = {
    mobCurrent: number;
};

interface DeskSliderI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    mobStep: number;

    slider?: Slider;

    sliderInit(this: DeskSliderI): void;
}

export default DeskSliderI;

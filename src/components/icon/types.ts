import icons from './static/icons.ts';

type PropsT = {
    name: (typeof icons)[number];
};

type StateT = {
    Component?: React.ReactNode;
};

interface IconI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    icons: typeof icons;

    loadIcon(this: IconI): Promise<void>;
}

export default IconI;

type IconT = (typeof icons)[number];

export type { IconT };

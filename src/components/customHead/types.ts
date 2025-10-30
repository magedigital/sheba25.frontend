type PropsT = Partial<{
    title: string | undefined;
    description: string | undefined;
    keywords?: string;
    link: string;
    image: string;
    children?: React.ReactNode;
}>;

type HelmetPropsT = {
    title?: string;
    meta: { property?: string; content: string; name?: string }[];
};

type StateT = {};

interface CustomHeadI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    getProps(this: CustomHeadI): HelmetPropsT;
}

export default CustomHeadI;

export type { HelmetPropsT };

type PropsT = {};

type StateT = {
    content?: MainContentT;
};

type MainContentT = {
    components: {
        header: HeaderContentT;
        footer: FooterContentT;
        howto: {
            steps: {
                step1: {
                    title: string;
                    description: string;
                    thumb: string;
                };
                step2: {
                    title: string;
                    description: string;
                    thumb: string;
                };
                step3: {
                    title: string;
                    description: string;
                    thumb: string;
                };
                step4: {
                    title: string;
                    description: string;
                    thumb: string;
                };
            };
            info: {
                button: {
                    title: string;
                };
                subline: {
                    title: string;
                    description: string;
                };
                bottomLink: {
                    title: string;
                    url: string;
                };
            };
            album: MainAlbumItemT[];
        };
    };
};

type MainAlbumItemT = {
    title: string;
    static: string;
    gif: string;
};

interface IndexI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    animateNodes: { node: HTMLElement; delay?: number }[];

    getContent(this: IndexI): Promise<void>;
}

export default IndexI;
export type { MainContentT, MainAlbumItemT };

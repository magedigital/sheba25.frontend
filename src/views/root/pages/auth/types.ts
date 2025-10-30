import pages from './static/pages';

type PropsT = {};

type StateT = {};

interface AuthI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    pages: typeof pages;
}

export default AuthI;

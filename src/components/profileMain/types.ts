import { StoreT } from '@global/types';

type PropsT = {
    user: StoreT['user'];
};

type StateT = {};

interface ProfileMainI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    requestLogout(this: ProfileMainI): Promise<void>;
}

export default ProfileMainI;

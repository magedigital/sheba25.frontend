import EditBlockI from '@components/editBlock/types';
import { StoreT } from '@global/types';

import socials from './static/socials';

type PropsT = {
    device: StoreT['device'];
    storePages: StoreT['pages'];
};

type StateT = {
    loadingKey?: string;
    error?: string;
    passwordMessage?: string;
};

interface LoginI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;
    socials: typeof socials;
    timers: Record<string, ReturnType<typeof setInterval>>;

    requestLogin(this: LoginI): Promise<void>;

    renderHead(this: LoginI): React.ReactNode;
    renderContent(this: LoginI): React.ReactNode;
    renderFields(this: LoginI): React.ReactNode;
    renderSocials(this: LoginI): React.ReactNode;
    renderFoot(this: LoginI): React.ReactNode;
}

export default LoginI;

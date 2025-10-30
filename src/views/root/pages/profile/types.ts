import { StoreT } from '@global/types';

type PropsT = {
    user: StoreT['user'];
};

type StateT = {
    loadingKey?: string;
    pagesRenderKey?: string;
    data?: ProfileDataT;
    content?: ProfileContentT;
    isReady?: boolean;
};

type ProfileDataT = {
    works: WorkT[];
    prizes: {}[];
    checks: {
        id: string;
        date: string;
        fd: string;
        points: number;
        status: string;
        statusCode: string;
        result: string;
    }[];
};

type WorkT = {
    id: string;
    date: string;
    comment: string;
    title: string;
    votes: number;
    thumb: string;
    gif: string;
    statusCode: 'converting' | 'uploading' | 'processing' | 'accepted' | 'refused' | 'checking';
    statusTitle: string;
    video?: string;
};

type ProfileContentT = {
    components: {
        footer: FooterContentT;
    };
};

interface ProfileI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;
    checkPrizesTimerId?: ReturnType<typeof setTimeout>;

    getContent(this: ProfileI): Promise<void>;

    renderContent(this: ProfileI): React.ReactNode;
    renderHead(this: ProfileI): React.ReactNode;
    renderMain(this: ProfileI): React.ReactNode;
    renderCheques(this: ProfileI): React.ReactNode;
    renderPrizes(this: ProfileI): React.ReactNode;
    renderPrize(this: ProfileI): React.ReactNode;
}

export default ProfileI;
export type { ProfileDataT, ProfileContentT, WorkT as ProfileWorkT };

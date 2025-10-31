import UserT from '@global/models/User';

import { ProfilePrizeT } from '../../types';

type PropsT = {
    prize: ProfilePrizeT;
    user: UserT;
};

type StateT = {
    isPromoShow?: boolean;
    isPromoForceShow?: boolean;
};

interface PrizeI extends React.Component<PropsT, StateT> {
    props: PropsT;
    state: StateT;

    parent: React.RefObject<HTMLDivElement | null>;

    promoTimerId?: ReturnType<typeof setTimeout>;

    promoHandler(this: PrizeI, isShow?: boolean): Promise<void>;

    renderHead(this: PrizeI): React.ReactNode;
    renderPreview(this: PrizeI): React.ReactNode;
    renderFoot(this: PrizeI): React.ReactNode;

    renderMain(this: PrizeI): React.ReactNode;
    renderPromo(this: PrizeI): React.ReactNode;
}

export default PrizeI;

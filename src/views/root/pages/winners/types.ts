import EditBlockI from '@components/editBlock/types';

type PropsT = {};

type StateT = {
    loadingKey?: string;
    winnersData?: WinnersDataT;
    currentTableCount: number;
    content?: WinnersContentT;
};

type WinnersContentT = {
    components: {
        footer: FooterContentT;
    };
};

type WinnersDataT = {
    raffles: {
        ended: boolean;
        from: string;
        id: string;
        name: string;
        publish: string;
        to: string;
    }[];
    winners: {
        email: string;
        phone: string;
        prize: string;
        publish: string;
        raffleId: string;
    }[];
};

interface WinnersI extends EditBlockI<StateT> {
    props: PropsT;

    parent: React.RefObject<HTMLDivElement | null>;
    step: number;

    getTableItems(this: WinnersI): any[];
    moreTableHandler(this: WinnersI): Promise<void>;
    getContent(this: WinnersI): Promise<void>;

    renderContent(this: WinnersI): React.ReactNode;
    renderHead(this: WinnersI): React.ReactNode;
    renderWinners(this: WinnersI): React.ReactNode;
    renderFilter(this: WinnersI): React.ReactNode;
    renderTable(this: WinnersI): React.ReactNode;
}

export default WinnersI;
export type { WinnersDataT, WinnersContentT };

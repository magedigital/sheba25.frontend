import React from 'react';

import CustomHead from '@components/customHead/CustomHead.tsx';
import EditBlock from '@components/editBlock/EditBlock.tsx';
import Footer from '@components/footer/Footer.tsx';
import { getLocalContent } from '@functions/localContent.ts';
import { scrollPage } from '@functions/savePageScroll.ts';

import getTableItems from './methods/getTableItems.ts';
import moreTableHandler from './methods/moreTableHandler.ts';

import WinnersI from './types.ts';

import renderContent from './renders/renderContent.tsx';
import renderFilter from './renders/renderFilter.tsx';
import renderHead from './renders/renderHead.tsx';
import renderTable from './renders/renderTable.tsx';
import renderWinners from './renders/renderWinners.tsx';
import getContent from './requests/getContent.ts';

class Winners extends EditBlock<WinnersI['props'], WinnersI['state']> implements WinnersI {
    parent: WinnersI['parent'];

    constructor(props: WinnersI['props']) {
        super(props);
        this.state = {
            currentTableCount: this.step,
            winnersData: getLocalContent('winnersData'),
            content: getLocalContent('indexContent'),
        };
        this.parent = React.createRef();
    }

    innerClassName = 'page__innerBox';
    step = 10;

    getContent = getContent;
    moreTableHandler = moreTableHandler;
    getTableItems = getTableItems;

    renderContent = renderContent;
    renderHead = renderHead;
    renderWinners = renderWinners;
    renderFilter = renderFilter;
    renderTable = renderTable;

    componentDidMount(): void {
        const page = this.parent.current!.closest('.body__page') as HTMLElement;

        scrollPage(page, 'winners');

        this.getContent();

        this.init({ fields: {} });
    }

    render() {
        const { content } = this.state;

        return (
            <div ref={this.parent} className="page _winners _SECTION _START_SECTION">
                <CustomHead title="Победители" />
                <div className="page__inner _INNER">{this.renderContent()}</div>
                <div className="page__footer">
                    <Footer content={content?.components.footer} />
                </div>
            </div>
        );
    }
}

export default Winners;

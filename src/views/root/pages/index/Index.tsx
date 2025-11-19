import React from 'react';
import { connect } from 'react-redux';

import Footer from '@components/footer/Footer.tsx';
import { getLocalContent } from '@functions/localContent.ts';
import { scrollPage } from '@functions/savePageScroll.ts';
import scrollToBlock from '@functions/scrollToBlock.ts';

import Header from './components/header/Header.tsx';
import Prizes from './components/prizes/Prizes.tsx';
import Rules from './components/rules/Rules.tsx';
import WeekPrizes from './components/weekPrizes/WeekPrizes.tsx';

import IndexI from './types.ts';

import getContent from './requests/getContent.ts';

class Index extends React.Component<IndexI['props'], IndexI['state']> implements IndexI {
    parent: IndexI['parent'];

    constructor(props: IndexI['props']) {
        super(props);
        this.state = {
            content: getLocalContent('indexContent'),
        };

        this.scrollHandler = this.scrollHandler.bind(this);

        this.parent = React.createRef();
    }

    animateNodes: IndexI['animateNodes'] = [];

    scrollHandler() {
        this.animateNodes.forEach(({ node, delay }) => {
            const { y } = node.getBoundingClientRect();

            if (
                y < document.documentElement.clientHeight - 150 &&
                y + node.offsetHeight > 150 &&
                !node.classList.contains('_showAnim')
            ) {
                setTimeout(() => {
                    node.classList.add('_showAnim');
                }, delay || 0);
            }
        });
    }

    getContent = getContent;

    componentDidMount(): void {
        const page = this.parent.current!.closest('.body__page') as HTMLElement;

        scrollPage(page, 'index');

        this.getContent();

        setTimeout(() => {
            const query = window.location.search.slice(1);

            if (query.includes('ancor')) {
                const ancor = query
                    .split('&')
                    .find((item) => item.split('=')[0] === 'ancor')
                    ?.split('=')[1];
                const blockNode = document.querySelector(`[data-ancor="${ancor}"]`) as HTMLElement;

                if (page && blockNode) {
                    scrollToBlock({ blockNode, scrollNode: page, duration: 0, offset: -100 });
                }
            }
        }, 100);

        document.querySelectorAll('._ANIM').forEach((n) => {
            const node = n as HTMLElement;
            const delayStr = node.getAttribute('data-delay');
            const delay = delayStr ? +delayStr : undefined;

            this.animateNodes.push({ node, delay });
        });

        this.scrollHandler();

        window.addEventListener('scroll', this.scrollHandler, true);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        const { content } = this.state;

        return (
            <div ref={this.parent} className="index _FULL_W">
                <div className="index__section _FULL_W">
                    <Header content={content} />
                </div>
                <div className="index__section _FULL_W">
                    <Rules />
                </div>
                <div className="index__section _FULL_W">
                    <Prizes />
                </div>
                <div className="index__section _FULL_W">
                    <WeekPrizes />
                </div>
                <div className="index__section _FULL_W">
                    <Footer content={content?.components.footer} />
                </div>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Index);

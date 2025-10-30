import React from 'react';
import { connect } from 'react-redux';

import List from '@components/list/List.tsx';
import { PageNamesT, StoreT } from '@global/types.ts';

import getPages from './methods/getPages.ts';
import init from './methods/init.ts';
import scrollHandler from './methods/scrollHandler.ts';

import PagesI from './types.ts';

class Pages extends React.Component<PagesI['props'], PagesI['state']> implements PagesI {
    constructor(props: PagesI['props']) {
        super(props);
        this.state = {
            pages: [],
        };
    }

    init = init;
    scrollHandler = scrollHandler;
    getPages = getPages;

    componentDidMount(): void {
        this.init();
    }

    render() {
        const {
            context,
            parentClass,
            itemClass,
            parentName,
            storePages,
            parentStyleProps = [],
            parentRealStyleProps = [],
            render404,
            callback,
            testMode,
            getItemClass,
        } = this.props;
        const pages = this.getPages();
        const renderKey = pages.map((page) => page._id).join('');

        return (
            <List
                renderKey={`${renderKey}${this.props.renderKey}`}
                items={pages}
                parentClass={parentClass || 'body__pages'}
                itemClass={itemClass || 'body__page _NOSCROLL'}
                itemStyleProps={[]}
                parentStyleProps={parentStyleProps}
                parentRealStyleProps={parentRealStyleProps}
                renderItem={({ item }: { item: { _id: PageNamesT } }) => {
                    if (item._id === '404' && render404) {
                        return render404.call(context);
                    }

                    return this.props.pages[item._id]?.render.call(context);
                }}
                disabled={parentName ? !storePages[parentName].isShow : undefined}
                getItemClass={({ item }) =>
                    [
                        ...(item.isPopup ? ['_popup'] : []),
                        ...(getItemClass ? [getItemClass({ item })] : []),
                    ].join(' ')
                }
                allItems={this.getPages(true).map((page) => page._id)}
                currentItem={pages[0]?._id}
                callback={callback}
                testMode={testMode}
                resizeWidth={true}
                itemOnScroll={this.scrollHandler.bind(this)}
            />
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(Pages);

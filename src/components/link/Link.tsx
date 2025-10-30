import React from 'react';
import { connect } from 'react-redux';

import getPageLink from '@functions/getPageLink.ts';
import { s } from '@functions/seo.ts';
import { StoreT } from '@global/types.ts';

import checkChange from './methods/checkChange.ts';
import checkCurrent from './methods/checkCurrent.ts';
import clickHandler from './methods/clickHandler.ts';
import getHref from './methods/getHref.ts';
import setHref from './methods/setHref.ts';

import LinkI from './types.ts';

class Link extends React.Component<LinkI['props'], LinkI['state']> implements LinkI {
    parent: LinkI['parent'];

    constructor(props: LinkI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    checkCurrent = checkCurrent;
    getHref = getHref;
    setHref = setHref;
    checkChange = checkChange;
    clickHandler = clickHandler;

    componentDidMount() {
        this.checkChange(true);
    }

    componentDidUpdate() {
        this.checkChange();
    }

    render() {
        const {
            children,
            className = '',
            tag,
            pageName,
            storePages,
            ids,
            ...otherProps
        } = this.props;
        let LinkTag = (tag || 'div') as React.ElementType;
        let href = this.getHref(this.props.href ?? this.state.href);
        const isCurrent = (this.props.isCurrent ?? this.checkCurrent()) || null;

        if (s()) {
            href = getPageLink({ name: pageName as string, storePages, ids });
            LinkTag = 'a';
        }

        return (
            <LinkTag
                className={`${className} _CLICK ${isCurrent ? '_current' : ''}`}
                onClick={this.clickHandler.bind(this)}
                ref={this.parent}
                href={href?.[0] === '/' ? href : `/${href}`}
                {...(!s() ? otherProps : {})}
            >
                {children}
            </LinkTag>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        levels: state.levels,
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(Link);

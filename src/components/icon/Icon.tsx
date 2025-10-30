import React from 'react';

import { s } from '@functions/seo.ts';

import loadIcon from './methods/loadIcon.ts';

import IconI from './types.ts';

import icons from './static/icons.ts';

class Icon extends React.Component<IconI['props'], IconI['state']> implements IconI {
    constructor(props: IconI['props']) {
        super(props);
        this.state = {};
    }

    icons = icons;

    loadIcon = loadIcon;

    componentDidMount() {
        this.loadIcon();
    }

    render() {
        const { Component } = this.state;

        if (s()) {
            return null;
        }

        return (
            <div className={`icon _COL ${Component ? '_show' : ''}`}>
                <>{Component || null}</>
            </div>
        );
    }
}

export default Icon;

import React from 'react';
import { Helmet } from 'react-helmet';

import getProps from './methods/getProps.ts';

import CustomHeadI from './types.ts';

class CustomHead extends React.Component<CustomHeadI['props']> implements CustomHeadI {
    constructor(props: CustomHeadI['props']) {
        super(props);
        this.state = {};
    }

    getProps = getProps;

    render() {
        const { children, link } = this.props;
        const propsHead = this.getProps();

        return (
            <Helmet {...propsHead}>
                <link rel="canonical" href={link} />
                {children}
            </Helmet>
        );
    }
}

export default CustomHead;

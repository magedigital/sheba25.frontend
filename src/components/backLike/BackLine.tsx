import React from 'react';

import BackLineI from './types.ts';

class BackLine
    extends React.Component<BackLineI['props'], BackLineI['state']>
    implements BackLineI
{
    parent: BackLineI['parent'];

    constructor(props: BackLineI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div ref={this.parent} className="backLine">
                <img
                    src={require('@media/play-icon.svg').default}
                    alt=""
                    className="backLine__icon"
                />
            </div>
        );
    }
}

export default BackLine;

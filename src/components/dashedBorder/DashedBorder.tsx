import React from 'react';

import DashedBorderI from './types.ts';

class DashedBorder
    extends React.Component<DashedBorderI['props'], DashedBorderI['state']>
    implements DashedBorderI
{
    parent: DashedBorderI['parent'];
    throttleHandler: DashedBorderI['throttleHandler'];

    constructor(props: DashedBorderI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { className, rx, ry } = this.props;

        return (
            <div ref={this.parent} className={`dashedBorder ${className || ''}`}>
                <svg width="100%" height="100%" className="dashedBorder__svg">
                    <rect
                        className="dashedBorder__rect"
                        x="1"
                        y="1"
                        fill="none"
                        rx={rx || 14}
                        ry={ry || 14}
                    />
                </svg>
            </div>
        );
    }
}

export default DashedBorder;

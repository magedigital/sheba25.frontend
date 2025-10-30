import React from 'react';

import checkChange from './methods/checkChange.ts';

import FadeI from './types.ts';

class Fade extends React.Component<FadeI['props'], FadeI['state']> implements FadeI {
    parent: FadeI['parent'];

    constructor(props: FadeI['props']) {
        super(props);
        this.state = {
            isShow: false,
        };

        this.parent = React.createRef();
    }

    checkChange = checkChange;

    componentDidMount(): void {
        this.checkChange(true);
    }

    componentDidUpdate() {
        this.checkChange();
    }

    render() {
        const { isShow } = this.state;
        const { children, className = '' } = this.props;

        if (!isShow) {
            return <></>;
        }

        return (
            <div ref={this.parent} className={`fade ${className}`}>
                {children}
            </div>
        );
    }
}

export default Fade;

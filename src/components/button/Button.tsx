import React from 'react';

import LoaderBlock from '@components/loaderBlock/LoaderBlock.tsx';

import ButtonI from './types.ts';

class Button extends React.Component<ButtonI['props'], ButtonI['state']> implements ButtonI {
    constructor(props: ButtonI['props']) {
        super(props);
        this.state = {};
    }

    render() {
        const { children, onClick, disabled, loading, className = '', label } = this.props;
        const ButtonTag = label ? 'label' : 'button';

        return (
            <ButtonTag
                className={`button _CLICK ${className}`}
                onClick={disabled || loading ? undefined : onClick}
            >
                <LoaderBlock className="button__loader" isShow={!!loading} />
                <div className="button__inner _ROW _ROW_H_CENTER _ROW_V_CENTER">{children}</div>
            </ButtonTag>
        );
    }
}

export default Button;

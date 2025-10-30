import React from 'react';

import Input from '@components/input/Input.tsx';

import FieldI from './types.ts';

class Field extends React.Component<FieldI['props'], FieldI['state']> implements FieldI {
    parent: FieldI['parent'];

    constructor(props: FieldI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const {
            support,
            inputSupport,
            name,
            value,
            onChange,
            type,
            reg,
            regExp,
            className = '',
            dateWithPast,
            isAmount,
            returnTemplate,
            textarea,
        } = this.props;

        return (
            <div ref={this.parent} className={`field ${className} ${textarea ? '_textarea' : ''}`}>
                {support && <p className="field__support">{support}</p>}

                <div className="field__box">
                    <Input
                        className="_grey"
                        name={name}
                        support={inputSupport}
                        value={value}
                        onChange={onChange}
                        type={type}
                        reg={reg}
                        regExp={regExp}
                        returnTemplate={returnTemplate}
                        dateWithPast={dateWithPast}
                        isAmount={isAmount}
                        textarea={textarea}
                    />
                </div>
            </div>
        );
    }
}

export default Field;

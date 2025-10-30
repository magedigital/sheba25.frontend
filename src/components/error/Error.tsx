import React from 'react';

import List from '@components/list/List.tsx';

import ErrorI from './types.ts';

class Error extends React.Component<ErrorI['props'], ErrorI['state']> implements ErrorI {
    parent: ErrorI['parent'];

    constructor(props: ErrorI['props']) {
        super(props);
        this.state = {};
        this.parent = React.createRef();
    }

    render() {
        const { className, error, callback } = this.props;

        return (
            <List
                renderKey={error}
                items={error ? [{ _id: encodeURIComponent(error), text: error }] : []}
                parentClass={`${className} error`}
                itemStyleProps={[]}
                parentStyleProps={['width']}
                parentRealStyleProps={['width']}
                renderItem={({ item }) => (
                    <div className="error__item _COL _COL_H_CENTER">
                        <div className="error__itemInner">{item.text}</div>
                    </div>
                )}
                callback={callback}
                resizeWidth={true}
            />
        );
    }
}

export default Error;

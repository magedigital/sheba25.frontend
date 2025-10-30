import React from 'react';

import Fade from '@components/fade/Fade.tsx';

import I from '../types.ts';

const renderList: I['renderList'] = function () {
    const { isShow } = this.state;
    const { items } = this.props;

    return (
        <Fade className="select__list _FULL_W" isShow={!!isShow}>
            <div className="select__listInner">
                {items.map((item) => (
                    <div
                        className="select__listItem _CLICK _FULL_W"
                        key={item.id}
                        onClick={this.itemHandler.bind(this, { id: item.id })}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </Fade>
    );
};

export default renderList;

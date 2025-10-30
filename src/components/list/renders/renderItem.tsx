import React from 'react';

import I from '../types.ts';

const renderItem: I['renderItem'] = function ({ item }) {
    const id = item._id;
    const {
        items,
        itemClass = '',
        withItemWrapper,
        getItemStyle,
        getItemClass,
        allItems,
        currentItem,
        itemOnScroll,
    } = this.props;

    const index = this.indexes[id];
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const isShow = this.states[id] === 1;
    const isHide = this.states[id] === 0;
    const WrapperTag = withItemWrapper === false ? React.Fragment : 'div';
    const wrapperProps = withItemWrapper === false ? {} : { className: 'list__itemBox' };
    const style = getItemStyle ? getItemStyle({ item }) : undefined;
    const propsClass = getItemClass ? getItemClass({ item }) : undefined;
    const classes = [
        itemClass,
        ...(isFirst ? ['_first'] : []),
        ...(isLast ? ['_last'] : []),
        ...(isShow ? ['_show'] : []),
        ...(propsClass ? [propsClass] : []),
    ];
    const prevItem = index > 0 ? items[index - 1] : undefined;
    const nextItem = index < items.length - 1 ? items[index + 1] : undefined;
    const itemIndex = allItems ? allItems.indexOf(id) : undefined;

    if (allItems) {
        if (itemIndex === this.currentIndex) {
            const currentIndex = allItems.indexOf(currentItem!);
            classes.push(itemIndex! < currentIndex! ? '_prev' : '_next');
        } else {
            classes.push(itemIndex! < this.currentIndex! ? '_prev' : '_next');
        }
    }

    return (
        <div
            className={`list__item ${classes.join(' ')}`}
            data-id={id}
            key={id}
            style={style}
            {...(itemOnScroll
                ? {
                      onScroll: (e) => {
                          itemOnScroll({ e, id });
                      },
                  }
                : {})}
        >
            <WrapperTag {...wrapperProps}>
                {this.props.renderItem({
                    item,
                    index,
                    prevItem,
                    nextItem,
                    isHide,
                    isShow,
                    isFirst,
                    isLast,
                })}
            </WrapperTag>
        </div>
    );
};

export default renderItem;

import React from 'react';

import Link from '@components/link/Link.tsx';
import changePage from '@functions/changePage.ts';
import scrollToBlock from '@functions/scrollToBlock.ts';
import { store } from '@redux/redux.ts';

import I from '../types.ts';

const renderMenu: I['renderMenu'] = function () {
    const { device } = this.props;
    const nav = this.getNav();

    return (
        <div className="topBar__menu">
            {nav.map((item, key) => {
                const { pageName, ancor } = item;
                const ItemTag = pageName ? Link : 'div';
                const itemProps = pageName
                    ? {
                          pageName,
                          callback: () => {
                              this.menuHandler(false);
                          },
                          forceChangePage: device === 'mobile' ? '.body__page' : undefined,
                      }
                    : ancor
                      ? {
                            onClick: () => {
                                if (store.getState().pages.index.isShow) {
                                    const scrollNode = document.querySelector(
                                        '.body__page[data-id="index"]',
                                    ) as HTMLElement;
                                    const blockNode = document.querySelector(
                                        `[data-ancor="${ancor}"]`,
                                    ) as HTMLElement;

                                    if (scrollNode && blockNode) {
                                        scrollToBlock({ blockNode, scrollNode, offset: -100 });
                                    }
                                } else {
                                    changePage({ pageName: 'index', query: { ancor } });
                                }

                                this.menuHandler(false);
                            },
                        }
                      : {};

                return (
                    <div className={`topBar__menuItem _CLICK _${item.name}`} key={key}>
                        <ItemTag className="topBar__menuLink" {...itemProps}>
                            {item.text}
                        </ItemTag>
                    </div>
                );
            })}
        </div>
    );
};

export default renderMenu;

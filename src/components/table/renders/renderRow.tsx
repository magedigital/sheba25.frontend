import React from 'react';

import setSpacesInText from '@functions/setSpacesInText.ts';

import I from '../types.ts';

import { TableT } from '../static/tables.ts';

const renderRow: I['renderRow'] = function ({ item, index, isShow }) {
    const { name, device } = this.props;
    const table = this.tables[name] as TableT;

    return (
        <div
            className={`table__row ${index % 2 === (device === 'mobile' ? 0 : 1) ? '_odd' : ''}`}
            key={item.id}
            style={{
                zIndex: !isShow ? 1 : index + 2,
            }}
        >
            {name === 'winners' ? (
                <>
                    {device === 'mobile' ? (
                        <>
                            {table.allCols.map((colName) => (
                                <div className="table__rowInner" key={colName}>
                                    <div className={`table__col _head _${colName}`}>
                                        {table.supports[colName]}
                                    </div>
                                    <div className={`table__col _${colName}`} key={colName}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: setSpacesInText(item[colName]),
                                            }}
                                        ></span>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <div className={`table__colWrapper _main`}>
                                <div className="table__col">{item[table.mainCol]}</div>
                            </div>
                            <div className={`table__colWrapper _other`}>
                                {table.cols.map((colName) => (
                                    <div className={`table__col _${colName}`} key={colName}>
                                        <div className="table__colInner">
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: setSpacesInText(item[colName]),
                                                }}
                                            ></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className={`table__colWrapper _main`}>
                        <div className="table__col">{item[table.mainCol]}</div>
                    </div>
                    <div className={`table__colWrapper _other`}>
                        {table.cols.map((colName) => (
                            <div className={`table__col _${colName}`} key={colName}>
                                <div className="table__colInner">
                                    {device === 'mobile' && name === 'cheques' ? (
                                        <>
                                            <span className="_support">
                                                {table.supports[colName]}:{' '}
                                            </span>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: setSpacesInText(item[colName] || '–'),
                                        }}
                                    ></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default renderRow;

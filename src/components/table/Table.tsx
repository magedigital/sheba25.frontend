import React from 'react';
import { connect } from 'react-redux';

import Fade from '@components/fade/Fade';
import List from '@components/list/List';
import LoaderBlock from '@components/loaderBlock/LoaderBlock';
import { StoreT } from '@global/types.js';

import renderRow from './renders/renderRow';
import tables, { TableT } from './static/tables';
import TableI from './types';

class Table extends React.Component<TableI['props'], TableI['state']> implements TableI {
    parent: TableI['parent'];

    constructor(props: TableI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    tables = tables;

    renderRow = renderRow;

    render() {
        const { name, items, device, emptyTitle, emptyDescription, callback } = this.props;
        const table = this.tables[name] as TableT;
        const renderKey = items.map((item) => item._id).join('');

        return (
            <>
                <div ref={this.parent} className={`table _${name}`}>
                    <div className="table__row _head">
                        <div className={`table__colWrapper _main`}>
                            <div className="table__col">{table.supports[table.mainCol]}</div>
                        </div>
                        <div className={`table__colWrapper _other`}>
                            {table.cols.map((colName, key) => (
                                <div className={`table__col _${colName}`} key={colName}>
                                    {table.supports[colName]}
                                    {device === 'mobile' &&
                                    name === 'cheques' &&
                                    key !== table.cols.length - 1 ? (
                                        <>,&nbsp;</>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="table__content">
                        <LoaderBlock className="table__loader" isShow={false} />
                        <Fade
                            className="table__empty _FULL _COL _COL_CENTER"
                            isShow={items.length === 0}
                        >
                            <div className="table__emptyTitle">{emptyTitle}</div>
                            {emptyDescription && (
                                <div className="table__emptyDescription">{emptyDescription}</div>
                            )}
                        </Fade>
                        <List
                            renderKey={renderKey}
                            items={items}
                            parentClass="table__contentInner _COL"
                            itemClass="table__rowWrapper"
                            itemStyleProps={['top']}
                            parentStyleProps={['width']}
                            parentRealStyleProps={['width']}
                            renderItem={this.renderRow.bind(this)}
                            resizeWidth={true}
                            minHeight={items.length === 0 ? 200 : undefined}
                            callback={callback}
                            drawClassNames={[`_${name}`]}
                        />
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        device: state.device,
    };
}

export default connect(mapStateToProps)(Table);

import React from 'react';

import Button from '@components/button/Button.tsx';
import List from '@components/list/List.tsx';
import Table from '@components/table/Table.tsx';

import I from '../types.ts';

const renderTable: I['renderTable'] = function () {
    const { currentTableCount, model, winnersData } = this.state;
    const allItems = this.getTableItems();
    const items = allItems.filter((item, key) => key < currentTableCount);
    const hasMore = allItems.length > currentTableCount;
    const currentRaffle = winnersData?.raffles.find((item) => item.id === model?.date);

    return (
        <>
            <div className="winners__table _FULL_W">
                <Table
                    name="winners"
                    items={items}
                    emptyTitle="Победители не найдены"
                    emptyDescription={
                        model?.phone?.length === 4
                            ? 'Попробуйте изменить критерии поиска'
                            : `Победители будут опубликованы ${currentRaffle?.publish || ''}`
                    }
                />
            </div>

            <List
                renderKey={`${!!hasMore}`}
                items={hasMore ? [{ _id: 'button' }] : []}
                parentClass="winners__foot"
                itemStyleProps={[]}
                parentStyleProps={['width']}
                parentRealStyleProps={['width']}
                renderItem={() => (
                    <div className="winners__footButton">
                        <Button className="_white" onClick={this.moreTableHandler.bind(this)}>
                            Показать еще
                        </Button>
                    </div>
                )}
                resizeWidth={true}
            />
        </>
    );
};

export default renderTable;

import React from 'react';

import Icon from '@components/icon/Icon.tsx';
import Input from '@components/input/Input.tsx';
import Select from '@components/select/Select.tsx';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const renderFilter: I['renderFilter'] = function () {
    const { winnersData } = this.state;

    return (
        <div className="winners__filter _FULL_W _BACK">
            <div className="winners__filterBlock _date">
                <div className="winners__filterBlockField">
                    <Select
                        name="date"
                        support="Выберите неделю"
                        value={this.getValue({ key: 'date' })?.value || ''}
                        items={
                            winnersData?.raffles.map((item) => ({
                                id: item.id,
                                content: `${item.from.slice(0, 5)} – ${item.to.slice(0, 5)}`,
                            })) || []
                        }
                        onChange={async ({ value }) => {
                            await this.change({ date: value });
                            await setAsyncState.call(this, { currentTableCount: this.step });
                        }}
                    />
                </div>
                <p className="winners__filterBlockSupport">
                    Выберите неделю, чтобы посмотреть победителей
                </p>
            </div>
            <div className="winners__filterBlock _search">
                <div className="winners__filterBlockField">
                    <i className="winners__filterBlockFieldIcon">
                        <Icon name="search" />
                    </i>
                    <Input
                        className="_inner"
                        support="Поиск по номеру телефона"
                        value={this.getValue({ key: 'phone' })?.value || ''}
                        name="phone"
                        onChange={async ({ value }) => {
                            const phone = value.slice(0, 4);

                            if (
                                phone &&
                                ((phone.length === 4 && this.state.model!.phone?.length !== 4) ||
                                    (phone.length !== 4 && this.state.model!.phone?.length === 4))
                            ) {
                                await setAsyncState.call(this, { currentTableCount: this.step });
                            }

                            await this.change({ phone });
                        }}
                        regExp={/\D/gi}
                    />
                </div>
                <p className="winners__filterBlockSupport">Введите последние 4&nbsp;цифры</p>
            </div>
        </div>
    );
};

export default renderFilter;

import React from 'react';

import Table from '@components/table/Table.tsx';

import I from '../types.ts';

const renderCheques: I['renderCheques'] = function () {
    const { data } = this.state;

    return (
        <div className="profile__cheques">
            <h3 className="profile__chequesTitle _TITLE _TITLE_MED">мои чеки</h3>
            <div className="profile__chequesTable">
                <Table
                    name="cheques"
                    items={(data?.checks || []).map((check) => ({ ...check, _id: check.id }))}
                />
            </div>
        </div>
    );
};

export default renderCheques;

import React from 'react';

import ProfileMain from '@components/profileMain/ProfileMain.tsx';

import I from '../types.ts';

const renderMain: I['renderMain'] = function () {
    return (
        <div className="profile__main">
            <ProfileMain />
        </div>
    );
};

export default renderMain;

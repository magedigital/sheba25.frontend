import React from 'react';

import TopBar from '@components/topBar/TopBar.tsx';
import checkChatbot from '@functions/checkChatbot.ts';

import I from '../types.ts';

const renderTopBar: I['renderTopBar'] = function () {
    if (checkChatbot()) {
        return;
    }

    return (
        <div className="body__topBar _FULL">
            <TopBar />
        </div>
    );
};

export default renderTopBar;

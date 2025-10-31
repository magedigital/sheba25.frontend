import React from 'react';

import Media from '@components/media/Media.tsx';
import changePage from '@functions/changePage.ts';

import I from '../types.ts';

const renderHead: I['renderHead'] = function () {
    return (
        <div className="topBar__head _SECTION">
            <div className="topBar__headInner _INNER">
                <Media current="desktop">
                    <a
                        className="topBar__logo"
                        href="https://sheba.ru/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={require('@media/sheba-logo.png')} alt="" />
                    </a>
                    <a
                        className="topBar__magLogo"
                        href="https://lenta.com/brand/sheba-10981372"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={require('@media/logo-lenta.svg').default} alt="" />
                    </a>
                    {this.renderMenu()}
                </Media>
                <Media current="mobile">
                    <div className="topBar__logos">
                        <a
                            className="topBar__logo"
                            href="https://sheba.ru/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={require('@media/sheba-logo.png')} alt="" />
                        </a>
                        <a
                            className="topBar__magLogo"
                            href="https://lenta.com/brand/sheba-10981372"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={require('@media/logo-lenta.svg').default} alt="" />
                        </a>
                    </div>
                    <div
                        className="topBar__stateButton _CLICK"
                        onClick={() => {
                            this.menuHandler();
                        }}
                    >
                        <div className="topBar__stateButtonItem _FULL _ROW _ROW_CENTER" />
                        <div className="topBar__stateButtonItem _FULL _ROW _ROW_CENTER" />
                        <div className="topBar__stateButtonItem _FULL _ROW _ROW_CENTER" />
                    </div>
                    <img
                        src={require('@media/icon-lk.svg').default}
                        alt=""
                        className="topBar__auth"
                        onClick={() => {
                            changePage({ pageName: 'auth-login' });
                        }}
                    />
                </Media>
            </div>
        </div>
    );
};

export default renderHead;

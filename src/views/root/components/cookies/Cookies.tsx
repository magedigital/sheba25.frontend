import React from 'react';
import { connect } from 'react-redux';

import Button from '@components/button/Button.tsx';
import { dispatcher } from '@redux/redux.ts';

import CookiesI from './types.ts';

class Cookies extends React.Component<CookiesI['props'], CookiesI['state']> implements CookiesI {
    parent: CookiesI['parent'];

    constructor(props: CookiesI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        return (
            <div className="cookies _FULL_W _COL _COL_H_CENTER">
                <p className="cookies__content">
                    Сайт использует cookie, что позволяет получать информацию о вас. Это нужно,
                    чтобы улучшать сайт. Продолжая пользоваться сайтом, вы соглашаетесь с
                    использованием cookie и предоставления их сторонним партнерам.
                </p>
                <div className="cookies__buttons _ROW">
                    <div className="cookies__button">
                        <Button
                            className="_main2 _minSize"
                            onClick={() => {
                                dispatcher({ type: 'acceptCookies', data: true });

                                localStorage.setItem('acceptCookies', 'true');
                            }}
                        >
                            ОК
                        </Button>
                    </div>
                </div>
                <a
                    href="/upload/docs/agreement.pdf"
                    className="cookies__link"
                    target="_blank"
                    rel="noreferrer"
                >
                    Пользовательское соглашение
                </a>
            </div>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Cookies);

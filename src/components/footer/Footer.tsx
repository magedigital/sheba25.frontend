import React from 'react';
import { connect } from 'react-redux';

import Link from '@components/link/Link.tsx';
import setSpacesInText from '@functions/setSpacesInText.ts';
import { StoreT } from '@global/types.ts';

import FooterI from './types.ts';

class Footer extends React.Component<FooterI['props'], FooterI['state']> implements FooterI {
    parent: FooterI['parent'];

    constructor(props: FooterI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { content } = this.props;
        const text = content?.disclaimer?.description;

        return (
            <div ref={this.parent} className="footer _SECTION">
                <div className="footer__inner _INNER">
                    <div className="footer__nav _ROW">
                        <a
                            href={content?.url3.url}
                            className="footer__navItem _CLICK"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {content?.url3.title}
                        </a>
                        <a
                            href={content?.url2.url}
                            className="footer__navItem _CLICK"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {content?.url2.title}
                        </a>
                        <Link pageName="faq" className="footer__navItem _CLICK">
                            Задать вопрос
                        </Link>
                    </div>
                    <div
                        className="footer__content"
                        dangerouslySetInnerHTML={{ __html: setSpacesInText(text) }}
                    ></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        storePages: state.pages,
    };
}

export default connect(mapStateToProps)(Footer);

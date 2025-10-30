import React from 'react';

import Media from '@components/media/Media.tsx';
import setSpacesInText from '@functions/setSpacesInText.ts';

import DeskSlider from './components/deskSlider/DeskSlider.tsx';

import BlockI from './types.ts';

class Block extends React.Component<BlockI['props'], BlockI['state']> implements BlockI {
    parent: BlockI['parent'];

    constructor(props: BlockI['props']) {
        super(props);
        this.state = {};

        this.parent = React.createRef();
    }

    render() {
        const { text, items, listCb } = this.props;

        return (
            <div ref={this.parent} className="productsBlock _COL">
                <p
                    className="productsBlock__text"
                    dangerouslySetInnerHTML={{ __html: setSpacesInText(text) }}
                ></p>
                <Media current="desktop">
                    <DeskSlider items={items} />
                </Media>
                <Media current="mobile">
                    <DeskSlider type="mobile" items={items} listCb={listCb} />
                </Media>
            </div>
        );
    }
}

export default Block;

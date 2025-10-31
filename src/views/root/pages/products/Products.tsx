import React from 'react';
import { connect } from 'react-redux';

import Footer from '@components/footer/Footer.tsx';
import Icon from '@components/icon/Icon.tsx';
import List from '@components/list/List.tsx';
import { getLocalContent } from '@functions/localContent.ts';

import Block from './components/block/Block.tsx';

import sliderInit from './methods/sliderInit.ts';

import ProductsI from './types.ts';

import getContent from './requests/getContent.ts';

class Products
    extends React.Component<ProductsI['props'], ProductsI['state']>
    implements ProductsI
{
    parent: ProductsI['parent'];
    slider: ProductsI['slider'];

    constructor(props: ProductsI['props']) {
        super(props);
        this.state = {
            content: getLocalContent('productsContent'),
        };

        this.parent = React.createRef();
    }

    sliderInit = sliderInit;

    getContent = getContent;

    componentDidMount(): void {
        this.getContent();
    }

    componentWillUnmount(): void {
        if (this.slider) {
            this.slider.destroy();
        }
    }

    render() {
        const { content, isDrag, listKey, currentId } = this.state;

        return (
            <>
                <div
                    ref={this.parent}
                    className={`products _SECTION _START_SECTION ${isDrag ? '_drag' : ''}`}
                >
                    {content && (
                        <div className="products__inner _INNER">
                            <h1 className="products__title _TITLE">соблазнительное меню</h1>
                            <div className="products__tabs">
                                <div className="products__tabsArrow _prev _CLICK">
                                    <Icon name="arrow-long-prev" />
                                </div>
                                <div className="products__tabsArrow _next _CLICK">
                                    <Icon name="arrow-long-next" />
                                </div>
                                <div className="products__tabsInner">
                                    <div className="products__tabsItems">
                                        {Object.keys(content.components.sections).map((id) => {
                                            const product = content.components.sections[id];

                                            return (
                                                <div className={`products__tabsItem`} key={id}>
                                                    <div className="products__tabsItemInner _COL">
                                                        <div className="products__tabsItemHead _CLICK">
                                                            <img
                                                                src={
                                                                    product.description.title.thumb
                                                                }
                                                                alt=""
                                                                className="products__tabsItemImage"
                                                            />
                                                        </div>
                                                        <p className="products__tabsItemName">
                                                            {product.description.title.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <List
                                renderKey={currentId ? [currentId, listKey].join('') : undefined}
                                items={currentId ? [{ _id: currentId }] : []}
                                parentClass="products__blocks"
                                itemClass="products__block"
                                itemStyleProps={[]}
                                parentStyleProps={['width']}
                                parentRealStyleProps={['width']}
                                renderItem={({ item }) => (
                                    <Block
                                        text={
                                            content.components.sections[item._id].description.title
                                                .description
                                        }
                                        items={content.components.sections[item._id].items}
                                        listCb={() => {
                                            this.setState({ listKey: new Date().getTime() });
                                        }}
                                    />
                                )}
                                resizeWidth={true}
                                // testMode={true}
                            />
                        </div>
                    )}
                </div>
                <div className="index__section _FULL_W">
                    <Footer content={content?.components.footer} />
                </div>
            </>
        );
    }
}

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps)(Products);

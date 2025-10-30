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
import { products } from './static/products.ts';

class Products
    extends React.Component<ProductsI['props'], ProductsI['state']>
    implements ProductsI
{
    parent: ProductsI['parent'];
    slider: ProductsI['slider'];

    constructor(props: ProductsI['props']) {
        super(props);
        this.state = {
            content: getLocalContent('indexContent'),
        };

        this.parent = React.createRef();
    }

    products = products;

    sliderInit = sliderInit;

    getContent = getContent;

    componentDidMount(): void {
        this.getContent();
        this.sliderInit();
    }

    componentWillUnmount(): void {
        if (this.slider) {
            this.slider.destroy();
        }
    }

    render() {
        const { content, isDrag, current, listKey } = this.state;

        console.log(listKey);

        return (
            <>
                <div
                    ref={this.parent}
                    className={`products _SECTION _START_SECTION ${isDrag ? '_drag' : ''}`}
                >
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
                                    {this.products.map((product) => (
                                        <div
                                            className={`products__tabsItem _id${product.id}`}
                                            key={product.id}
                                        >
                                            <div className="products__tabsItemInner _COL">
                                                <div className="products__tabsItemHead _CLICK">
                                                    <img
                                                        src={require(`@media/${product.thumb}`)}
                                                        alt=""
                                                        className="products__tabsItemImage"
                                                    />
                                                </div>
                                                <p className="products__tabsItemName">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <List
                            renderKey={
                                typeof current === 'number'
                                    ? [current, listKey].join('')
                                    : undefined
                            }
                            items={typeof current === 'number' ? [{ _id: current.toString() }] : []}
                            parentClass="products__blocks"
                            itemClass="products__block"
                            itemStyleProps={[]}
                            parentStyleProps={['width']}
                            parentRealStyleProps={['width']}
                            renderItem={() => (
                                <Block
                                    text="Коллекция из великолепных блюд, приготовленных из высококачественных ингредиентов по особому рецепту SHEBA®. Сочетание нежных мясных или рыбных ломтиков и фирменного обволакивающего соуса поможет вашей любимице раствориться в незабываемых ощущениях."
                                    items={[
                                        {
                                            thumb: 'pack-01.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Форель и креветки, 75 г',
                                        },
                                        {
                                            thumb: 'pack-02.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Говядина, 75 г',
                                        },
                                        {
                                            thumb: 'pack-03.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Говядина и кролик, 75 г',
                                        },
                                        {
                                            thumb: 'pack-04.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Курица и индейка, 75 г',
                                        },
                                        {
                                            thumb: 'pack-05.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Курица, 75 г',
                                        },
                                        {
                                            thumb: 'pack-06.png',
                                            title: 'SHEBA® ЛОМТИКИ в соусе Лосось, 75 г',
                                        },
                                    ]}
                                    listCb={() => {
                                        this.setState({ listKey: new Date().getTime() });
                                    }}
                                />
                            )}
                            resizeWidth={true}
                            // testMode={true}
                        />
                    </div>
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

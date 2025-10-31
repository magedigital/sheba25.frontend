import React from 'react';

import Button from '@components/button/Button.tsx';
import Icon from '@components/icon/Icon.tsx';
import List from '@components/list/List.tsx';
import setSpacesInText from '@functions/setSpacesInText.ts';

import sliderInit from './methods/sliderInit.ts';

import DeskSliderI from './types.ts';

class DeskSlider
    extends React.Component<DeskSliderI['props'], DeskSliderI['state']>
    implements DeskSliderI
{
    parent: DeskSliderI['parent'];
    slider: DeskSliderI['slider'];

    constructor(props: DeskSliderI['props']) {
        super(props);
        this.state = {
            mobCurrent: this.mobStep,
        };

        this.parent = React.createRef();
    }

    mobStep = 6;

    sliderInit = sliderInit;

    renderItem(item: { thumb: string; title: string }): React.ReactNode {
        return (
            <div className="productsBlock__sliderCard">
                <div className="productsBlock__sliderCardHead">
                    <img src={item.thumb} alt="" className="productsBlock__sliderCardImage" />
                </div>
                <p
                    className="productsBlock__sliderCardName"
                    dangerouslySetInnerHTML={{
                        __html: setSpacesInText(item.title),
                    }}
                ></p>
            </div>
        );
    }

    componentDidMount(): void {
        this.sliderInit();
    }

    componentWillUnmount(): void {
        if (this.slider) {
            this.slider.destroy();
        }
    }

    render() {
        const { mobCurrent } = this.state;
        const { items, type, listCb } = this.props;

        return (
            <div ref={this.parent} className="productsBlock__slider _COL">
                {type !== 'mobile' && (
                    <>
                        <div className="productsBlock__sliderArrow _prev _CLICK">
                            <Icon name="arrow-long-prev" />
                        </div>
                        <div className="productsBlock__sliderArrow _next _CLICK">
                            <Icon name="arrow-long-next" />
                        </div>
                    </>
                )}
                {type === 'mobile' ? (
                    <>
                        <List
                            renderKey={mobCurrent.toString()}
                            items={items
                                .filter((item, i) => i < mobCurrent)
                                .map((item, i) => ({ ...item, _id: 'id' + i.toString() }))}
                            parentClass="productsBlock__sliderItems"
                            itemClass="productsBlock__sliderItem"
                            itemStyleProps={['left', 'top']}
                            parentStyleProps={['width']}
                            parentRealStyleProps={['width']}
                            renderItem={({ item }) => this.renderItem(item)}
                            resizeWidth={true}
                            callback={listCb}
                        />
                        {items.length > mobCurrent && (
                            <>
                                <div className="productsBlock__sliderButton">
                                    <Button
                                        className="_mainEmpty"
                                        onClick={() => {
                                            this.setState({
                                                mobCurrent: mobCurrent + this.mobStep,
                                            });
                                        }}
                                    >
                                        показать ещё
                                    </Button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="productsBlock__sliderItems">
                        {items.map((item, i) => (
                            <div className="productsBlock__sliderItem" key={i}>
                                {this.renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default DeskSlider;

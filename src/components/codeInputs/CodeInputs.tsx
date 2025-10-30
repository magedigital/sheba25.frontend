import React from 'react';
import { connect } from 'react-redux';

import LoaderBlock from '@components/loaderBlock/LoaderBlock.tsx';
import { StoreT } from '@global/types.ts';

import checkClear from './methods/checkClear.ts';
import init from './methods/init.ts';
import inputHandler from './methods/inputHandler.ts';

import CodeInputsI from './types.ts';

class CodeInputs
    extends React.Component<CodeInputsI['props'], CodeInputsI['state']>
    implements CodeInputsI
{
    parent: CodeInputsI['parent'];

    constructor(props: CodeInputsI['props']) {
        super(props);
        this.state = {
            inputs: [],
        };

        this.parent = React.createRef();
    }

    inputHandler = inputHandler;

    init = init;

    checkClear = checkClear;

    componentDidMount(): void {
        this.init();
    }

    componentDidUpdate() {
        this.checkClear();
    }

    render() {
        const { inputs } = this.state;
        const { loading, device } = this.props;

        return (
            <div ref={this.parent} className="codeInputs _ROW">
                {inputs.map((input, key) => (
                    <div className="codeInputs__item" key={key} data-key={key}>
                        <input
                            className="codeInputs__itemInput"
                            type={device === 'desktop' ? 'text' : 'number'}
                            value={input}
                            onChange={({ target }) => {
                                this.inputHandler(key, { value: target.value });
                            }}
                            disabled={!!loading}
                        />
                    </div>
                ))}
                <LoaderBlock
                    className="codeInputs__loader"
                    isShow={!!loading}
                />
            </div>
        );
    }
}

function mapStateToProps(state: StoreT) {
    return {
        device: state.device,
    };
}

export default connect(mapStateToProps)(CodeInputs);

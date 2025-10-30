import React from 'react';

import Button from '@components/button/Button.tsx';
import EditBlock from '@components/editBlock/EditBlock.tsx';
import Error from '@components/error/Error.tsx';
import { CustomListenerT } from '@global/types.ts';

import addressHandler from './methods/addressHandler.ts';
import checkSuccess from './methods/checkSuccess.ts';
import sendForm from './methods/sendForm.ts';
import setField from './methods/setField.ts';

import AnketFormI from './types.ts';

import renderField from './renders/renderField.tsx';
import renderSuccess from './renders/renderSuccess.tsx';

class AnketForm extends EditBlock<AnketFormI['props'], AnketFormI['state']> implements AnketFormI {
    parent: AnketFormI['parent'];

    constructor(props: AnketFormI['props']) {
        super(props);
        this.state = {
            addressList: {},
        };

        this.setField = this.setField.bind(this);

        this.parent = React.createRef();
    }

    addressTimers: AnketFormI['addressTimers'] = {};

    checkSuccess = checkSuccess;
    sendForm = sendForm;
    setField = setField;

    addressHandler = addressHandler;

    renderField = renderField;
    renderSuccess = renderSuccess;

    async componentDidMount() {
        const { defaultData, fields } = this.props;

        await this.init({ fields: defaultData || {} });

        const addressList: AnketFormI['state']['addressList'] = {};

        fields.forEach((field) => {
            if (field.withAddress) {
                addressList[field.name] = { value: defaultData?.[field.name], list: [] };
            }
        });

        this.setState({ addressList });

        this.checkSuccess();

        (document.addEventListener as CustomListenerT)('setAnketField', this.setField);
    }

    componentDidUpdate() {
        this.checkSuccess();
    }

    componentWillUnmount(): void {
        Object.keys(this.addressTimers).forEach((key) => {
            clearTimeout(this.addressTimers[key]);
        });

        (document.removeEventListener as CustomListenerT)('setAnketField', this.setField);
    }

    render() {
        const { isSuccess, loadingKey, model } = this.state;
        const { fields, error, buttonText, renderHead, requireSupport } = this.props;

        return (
            <div
                ref={this.parent}
                className={`anketForm _COL _COL_H_CENTER ${isSuccess ? '_success' : ''}`}
            >
                {renderHead ? renderHead() : undefined}
                {this.renderSuccess()}
                <div className="anketForm__inner _FULL_W _COL _COL_H_CENTER">
                    {model && (
                        <div className="anketForm__fields _FULL_W">
                            {fields.map((field) => this.renderField({ field }))}
                        </div>
                    )}

                    {requireSupport && (
                        <p className="anketForm__support _FULL_W">* обязательные поля</p>
                    )}
                    <Error className="anketForm__error" error={error} />
                    <div className="anketForm__button">
                        <Button
                            className="_main"
                            onClick={this.sendForm.bind(this)}
                            loading={loadingKey === 'send'}
                        >
                            {buttonText || 'Отправить'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AnketForm;

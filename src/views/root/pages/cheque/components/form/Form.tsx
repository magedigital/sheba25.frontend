import React from 'react';

import Button from '@components/button/Button.tsx';
import DashedBorder from '@components/dashedBorder/DashedBorder.tsx';
import EditBlock from '@components/editBlock/EditBlock.tsx';
import Error from '@components/error/Error.tsx';
import Field from '@components/field/Field.tsx';
import Icon from '@components/icon/Icon.tsx';

import deleteFile from './methods/deleteFile.ts';
import uploadHandler from './methods/uploadHandler.ts';

import ChequeFormI from './types.ts';

import sendForm from './requests/sendForm.ts';
import fields, { FieldT } from './static/fields.ts';

class ChequeForm
    extends EditBlock<ChequeFormI['props'], ChequeFormI['state']>
    implements ChequeFormI
{
    parent: ChequeFormI['parent'];

    constructor(props: ChequeFormI['props']) {
        super(props);
        this.state = {
            files: [],
        };

        this.parent = React.createRef();
    }

    formData = new FormData();

    fields = fields;

    uploadHandler = uploadHandler;
    deleteFile = deleteFile;
    sendForm = sendForm;

    async componentDidMount() {
        const { scanResult } = this.props;

        await this.init({
            fields: {
                ...scanResult,
            },
        });

        if (scanResult) {
            await this.sendForm();
        }
    }

    render() {
        const { error, model, files, loadingKey } = this.state;
        const { qrType, setRenderKey } = this.props;

        return (
            <div ref={this.parent} className="popup__block _COL _COL_H_CENTER">
                <div className="popup__form _cheque _FULL_W">
                    {model &&
                        (Object.keys(this.fields) as (keyof typeof this.fields)[]).map((name) => {
                            const field = this.fields[name] as FieldT;

                            return (
                                <div className="popup__formField _short" key={name}>
                                    <Field
                                        className="_grey"
                                        name={name}
                                        support={field.support}
                                        inputSupport={field.inputSupport}
                                        reg={field.reg}
                                        onChange={async ({ value }) => {
                                            await this.change({ [name]: value });
                                        }}
                                        value={model?.[name] || ''}
                                        dateWithPast={field.dateWithPast}
                                        regExp={field.regExp}
                                        isAmount={field.isAmount}
                                        returnTemplate={name === 'date' || name === 'time'}
                                    />
                                </div>
                            );
                        })}
                    {qrType === 'typing' && (
                        <label className="popup__formUpload _FULL_W _COL _COL_CENTER _CLICK">
                            <div className="popup__formUploadBorder">
                                <DashedBorder />
                            </div>
                            <input
                                type="file"
                                multiple
                                accept=".jpg,.jpeg,.png"
                                onChange={this.uploadHandler.bind(this)}
                            />
                            <div className="popup__formUploadFiles _ROW">
                                {files.map((file) => (
                                    <div className="popup__formUploadFile" key={file.id}>
                                        <img
                                            src={file.src}
                                            alt=""
                                            className="popup__formUploadFilePreview"
                                        />
                                        <div
                                            className="popup__formUploadFileDelete _CLICK _COL _COL_CENTER"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();

                                                this.deleteFile(file.id);
                                            }}
                                        >
                                            <i className="popup__formUploadFileDeleteIcon">
                                                <Icon name="close" />
                                            </i>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="popup__formUploadText">
                                Приложи одно или несколько фото чека с&nbsp;фискальными данными
                            </p>
                        </label>
                    )}
                </div>
                <Error error={error} className="popup__error" callback={setRenderKey} />
                <div className="popup__buttons _FULL_W _ROW _ROW_CENTER">
                    <div className="popup__button">
                        <Button
                            className="_main"
                            onClick={this.sendForm.bind(this)}
                            loading={loadingKey === 'send'}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChequeForm;

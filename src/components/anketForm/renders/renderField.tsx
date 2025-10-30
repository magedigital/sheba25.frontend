import React from 'react';

import Checkbox from '@components/checkbox/Checkbox.tsx';
import Input from '@components/input/Input.tsx';
import Upload from '@components/upload/Upload.tsx';
import setSpacesInText from '@functions/setSpacesInText.ts';

import I from '../types.ts';

const renderField: I['renderField'] = function ({ field }) {
    const { upload } = this.props;
    const fieldType = field.fieldType || 'input';
    const support = typeof field.support === 'function' ? field.support() : field.support;
    const addressList = this.state.addressList[field.name];
    const fieldValue = field.withAddress
        ? addressList?.value
        : this.getValue({ key: field.name })?.value;

    return (
        <div
            className={`anketForm__field ${field.textarea ? '_textarea' : ''} _FULL_W _type-${fieldType} _name-${field.name}`}
            key={field.name}
        >
            {fieldType === 'input' && (
                <>
                    <p
                        className="anketForm__fieldSupport"
                        dangerouslySetInnerHTML={{ __html: setSpacesInText(support + ':') }}
                    ></p>
                    <div className="anketForm__fieldBox _FULL_W">
                        <Input
                            className="_inner"
                            value={fieldValue || ''}
                            name={field.name}
                            reg={field.reg}
                            regExp={field.regExp}
                            type={field.type}
                            textarea={field.textarea}
                            onChange={async ({ value }) => {
                                if (field.maxLen) {
                                    value = value.slice(0, field.maxLen);
                                }

                                if (field.withAddress) {
                                    await this.addressHandler({ name: field.name, value });
                                } else {
                                    await this.change({ [field.name]: value });
                                }
                            }}
                            returnTemplate={false}
                            dateWithPast={field.dateWithPast}
                        />
                    </div>
                    {field.withAddress && addressList && addressList.list.length > 0 && (
                        <>
                            <div className="anketForm__fieldList _FULL_W">
                                {addressList.list.map((item, key) => (
                                    <div
                                        className="anketForm__fieldListItem _CLICK"
                                        key={key}
                                        dangerouslySetInnerHTML={{ __html: item }}
                                        onClick={async () => {
                                            await this.addressHandler({
                                                name: field.name,
                                                value: item,
                                                choice: true,
                                            });
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
            {fieldType === 'checkbox' && (
                <>
                    <Checkbox
                        value={!!this.getValue({ key: field.name })?.value}
                        onChange={async ({ value }) => {
                            await this.change({ [field.name]: value });
                        }}
                    >
                        {support}
                    </Checkbox>
                </>
            )}
            {fieldType === 'upload' && (
                <>
                    <p
                        className="anketForm__fieldSupport"
                        dangerouslySetInnerHTML={{ __html: setSpacesInText(support) }}
                    ></p>
                    <Upload
                        fileName={this.getValue({ key: `${field.name}.name` })?.value || undefined}
                        onChange={async (e) => {
                            if (upload) {
                                await upload(field.name, e);
                            }
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default renderField;

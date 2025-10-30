import React from 'react';

import { store } from '@redux/redux.ts';

import change from './methods/change.ts';
import changeReg from './methods/changeReg.ts';
import changeRegExp from './methods/changeRegExp.ts';
import checkSpecChar from './methods/checkSpecChar.ts';
import clearValue from './methods/clearValue.ts';
import focus from './methods/focus.ts';
import getConcat from './methods/getConcat.ts';
import init from './methods/init.ts';
import resize from './methods/resize.ts';
import savePos from './methods/savePos.ts';
import setAreaHeight from './methods/setAreaHeight.ts';
import setValue from './methods/setValue.ts';
import validateReg from './methods/validateReg.ts';

import InputI from './types.ts';

import regs from './static/reg.ts';

class Input extends React.Component<InputI['props'], InputI['state']> implements InputI {
    input: InputI['input'];
    parent: InputI['parent'];
    isInit?: boolean;
    updatedKey?: any;

    constructor(props: InputI['props']) {
        super(props);
        this.state = {};

        this.resize = this.resize.bind(this);

        this.input = React.createRef();
        this.parent = React.createRef();
    }

    regs = regs;
    pressShift = false;

    savePos = savePos;
    checkSpecChar = checkSpecChar;
    validateReg = validateReg;
    changeReg = changeReg;
    setAreaHeight = setAreaHeight;
    changeRegExp = changeRegExp;
    change = change;
    focus = focus;
    clearValue = clearValue;
    setValue = setValue;
    init = init;
    resize = resize;
    getConcat = getConcat;

    componentDidMount() {
        const { name, updatedKey, calcHeight, id } = this.props;

        this.updatedKey = updatedKey;

        this.init();

        this.setState({ id: `${id}-${name}-${new Date().getTime().toString().slice(-3)}` });

        // setTimeout(() => {
        //     this.setAreaHeight();
        // }, 10);

        if (calcHeight) {
            window.addEventListener('resize', this.resize);
        }
    }

    componentDidUpdate() {
        const { updatedKey } = this.props;

        this.init();

        if (updatedKey !== this.updatedKey) {
            this.updatedKey = updatedKey;

            this.init(true);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    render() {
        const { isFocus, id } = this.state;
        const {
            textarea,
            support,
            disabled,
            onClick,
            className = '',
            error,
            withoutLabel,
            isShowSupportInFocus,
            isStatic,
            readOnly,
            name,
        } = this.props;
        let InputTag = textarea ? 'textarea' : 'input';
        let props: Record<any, unknown> = {
            className: `input__field _NOSCROLL`,
            onClick,
            ref: this.input,
        };
        const LabelTag = withoutLabel ? 'div' : 'label';
        const value = this.props.reg || this.props.concat ? this.state.value : this.props.value;

        if (isStatic) {
            InputTag = 'div';
            props = {
                ...props,
                dangerouslySetInnerHTML: { __html: this.props.value },
            };
        } else {
            props = {
                ...props,
                type: this.props.type || 'text',
                onKeyDown: (e: KeyboardEvent) => {
                    const device = store.getState().device;

                    if (device === 'desktop') {
                        if (e.which === 16) {
                            this.pressShift = true;
                        }

                        if (!this.pressShift && e.which === 13) {
                            e.preventDefault();
                        }
                    }

                    this.savePos();
                },
                onKeyUp: (e: KeyboardEvent) => {
                    const device = store.getState().device;

                    if (device === 'desktop') {
                        if (e.which === 16) {
                            this.pressShift = false;
                        }
                    }
                },
                onFocus: this.focus.bind(this, true),
                onBlur: this.focus.bind(this, false),
                onChange: this.change.bind(this),
                value,
                disabled: disabled || readOnly,
                rows: 1,
                id,
                autocomplete: 'new-password',
            };
        }

        return (
            <>
                <div
                    ref={this.parent}
                    className={`input _name${name} ${!isShowSupportInFocus && isFocus ? '_focus' : ''} ${
                        value === null || value === undefined || value === '' ? '_empty' : ''
                    } ${textarea ? '_area' : ''} ${className} ${error ? '_error' : ''} ${disabled ? '_disabled' : ''} ${isStatic ? '_static' : ''}`}
                    id={`inputParent-${id}`}
                >
                    {support && (
                        <LabelTag className="input__support" htmlFor={id}>
                            {support}
                        </LabelTag>
                    )}
                    <InputTag {...props} />
                </div>
            </>
        );
    }
}

export default Input;

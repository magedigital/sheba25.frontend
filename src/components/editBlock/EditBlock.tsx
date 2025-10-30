import React from 'react';

import { CustomListenerT } from '../../global/types.ts';

import addArrayItem from './methods/addArrayItem.ts';
import change from './methods/change.ts';
import checkChange from './methods/checkChange.ts';
import deleteArrayItem from './methods/deleteArrayItem.ts';
import getAllKeys from './methods/getAllKeys.ts';
import getItemValue from './methods/getItemValue.ts';
import getSelectText from './methods/getSelectText.ts';
import getValue from './methods/getValue.ts';
import init from './methods/init.ts';

import EditBlockI from './types.ts';

class EditBlock<P = {}, S = {}>
    extends React.Component<P, EditBlockI<S>['state']>
    implements EditBlockI<EditBlockI<S>['state']>
{
    parent: EditBlockI['parent'];
    updateSocket: EditBlockI['updateSocket'];
    checkFields: EditBlockI['checkFields'];

    constructor(props: P) {
        super(props);
        this.state = {} as EditBlockI['state'] & S;

        this.updateListKey = this.updateListKey.bind(this);

        if (this.updateSocket) {
            this.updateSocket = this.updateSocket.bind(this);
        }

        this.parent = React.createRef();
    }

    name = 'model';

    savedName = 'savedModel';

    init = init;
    getSelectText = getSelectText;
    getItemValue = getItemValue;
    getValue = getValue;
    change = change;
    deleteArrayItem = deleteArrayItem;
    addArrayItem = addArrayItem;
    getAllKeys = getAllKeys;
    checkChange = checkChange;

    updateListKey(this: EditBlockI): void {
        this.setState({ updatedListKey: new Date().getTime() });
    }

    getField(name: string): string {
        return this.state[this.name as 'model']?.[name] as string;
    }

    componentDidMount(): void {
        if (this.updateSocket) {
            (document.addEventListener as CustomListenerT)('updateSocket', this.updateSocket);
        }
    }

    componentWillUnmount(): void {
        if (this.updateSocket) {
            (document.removeEventListener as CustomListenerT)('updateSocket', this.updateSocket);
        }
    }
}

export default EditBlock;

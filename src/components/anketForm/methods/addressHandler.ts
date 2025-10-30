import Dadata from '@classes/dadata/Dadata.ts';
import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const addressHandler: I['addressHandler'] = async function ({ name, value, choice }) {
    const addressList = { ...this.state.addressList };

    if (!addressList[name]) {
        addressList[name] = {
            value: '',
            list: [],
        };
    }

    let resultValue = value;

    if (choice) {
        const div = document.createElement('div');

        div.innerHTML = value;

        resultValue = div.innerText;

        await this.change({ [name]: resultValue });

        addressList[name].list = [];
    }

    addressList[name].value = resultValue;

    await setAsyncState.call(this, { addressList });

    if (this.addressTimers[name]) {
        clearTimeout(this.addressTimers[name]);
    }

    if (!choice) {
        this.addressTimers[name] = setTimeout(async () => {
            const data = await new Dadata().get(value);

            addressList[name].list = data;

            await setAsyncState.call(this, { addressList });
        }, 300);
    }
};

export default addressHandler;

import EditBlockI from '../types.ts';

const getItemValue: EditBlockI['getItemValue'] = function ({ item, model, parentKey, key }) {
    let value;

    if (item && parentKey) {
        value = this.getValue({ model: item, key });
    }

    if (!value || !value.model) {
        value = this.getValue({ model, key: `${parentKey}.${key}` });
    }

    return value;
};

export default getItemValue;

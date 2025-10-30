import EditBlockI from '../types.ts';

const getSelectText: EditBlockI['getSelectText'] = function ({ model, item, parentKey, key }) {
    return model.FIELD_TYPES?.find(
        (innerItem: { key: string }) =>
            innerItem.key ===
            this.getItemValue({
                model,
                item,
                parentKey,
                key,
            })?.value,
    )?.content;
};

export default getSelectText;

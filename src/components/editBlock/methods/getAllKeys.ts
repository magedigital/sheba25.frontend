import sortAlphabet from '@functions/sortAlphabet.ts';

import EditBlockI, { ModelT } from '../types.ts';

const getAllKeys: EditBlockI['getAllKeys'] = function ({ item, parentKey }) {
    const keys: string[] = [];

    if (!item) {
        keys.push(parentKey as string);
    } else {
        delete item.UPDATED_KEY;

        Object.keys(item).forEach((key) => {
            const value = item[key];
            const resultParentKey = (parentKey ? `${parentKey}.` : '') + key;

            if (Array.isArray(value)) {
                const array = [...value];

                if (array.every((arrayItem) => typeof arrayItem === 'string')) {
                    array.sort(sortAlphabet.bind(null, undefined));
                }

                array.forEach((arrayItem, index) => {
                    if (typeof arrayItem === 'string') {
                        keys.push(`${resultParentKey}.${index}`);
                    } else {
                        const itemKeys = this.getAllKeys({
                            item: arrayItem,
                            parentKey: `${resultParentKey}.${arrayItem._id || index}`,
                        }) as string[];

                        keys.push(...itemKeys);
                    }
                });
            } else if (typeof value === 'object') {
                const itemKeys = this.getAllKeys({
                    item: value,
                    parentKey: resultParentKey,
                }) as string[];

                keys.push(...itemKeys);
            } else {
                keys.push(resultParentKey);
            }
        });
    }

    if (!parentKey) {
        const resultKeys: ModelT = {};

        keys.forEach((key) => {
            const { value } = this.getValue({ model: item, key }) as ModelT;

            resultKeys[key] = value;
        });

        return resultKeys;
    }

    return keys;
};

export default getAllKeys;

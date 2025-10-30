import axios from 'axios';

import I from '../types.ts';

const get: I['get'] = async function (query) {
    if (!query) {
        return [];
    }

    let response;

    try {
        response = await axios.post<
            {},
            {
                data: {
                    suggestions: {
                        value?: string;
                        data?: {
                            postal_code?: number;
                        };
                    }[];
                };
            }
        >(
            this.url,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${this.token}`,
                },
            },
        );
    } catch (error) {
        return Promise.reject();
    }

    const { data } = response;

    const items = data.suggestions
        .filter((item) => item.value)
        .map(
            (item) => `${item.data?.postal_code ? `${item.data?.postal_code}, ` : ''}${item.value}`,
        );
    const resultItems: string[] = [];

    items.forEach((item) => {
        if (resultItems.indexOf(item) === -1) {
            resultItems.push(item);
        }
    });

    const beautyItems: string[] = [];

    resultItems.forEach((address) => {
        const resultValue: string[] = [];

        address
            .trim()
            .split(' ')
            .forEach((addressItem) => {
                const resultAddressItem = addressItem.toLowerCase().replace(/,/g, '');
                const clearValueItems = query.toLowerCase().replace(/,/g, '').trim().split(' ');
                const valueItems = query.trim().split(' ');

                const valueIndex = clearValueItems.findIndex(
                    (valueItem) => resultAddressItem.indexOf(valueItem) !== -1,
                );

                if (valueIndex !== -1) {
                    const valueItem = valueItems[valueIndex];

                    const reg = new RegExp(valueItem, 'gi');

                    resultValue.push(
                        `${addressItem.replace(reg, '<span class="_beauty">$&</span>')}`,
                    );
                } else {
                    resultValue.push(addressItem);
                }
            });

        beautyItems.push(resultValue.join(' '));
    });

    return beautyItems;
};

export default get;

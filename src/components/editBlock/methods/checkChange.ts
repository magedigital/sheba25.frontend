import EditBlockI, { ModelT } from '../types.ts';

const checkChange: EditBlockI['checkChange'] = function (withModel) {
    const { deleteItems = [] } = this.state;
    let model = this.state[this.name as keyof EditBlockI['state']];
    let savedModel = this.state[this.savedName as keyof EditBlockI['state']];
    const fields: ModelT = {};
    const changedModel = {};

    if (model && savedModel) {
        model = JSON.parse(JSON.stringify(model));
        savedModel = JSON.parse(JSON.stringify(savedModel));

        const clearKey = (key: string) =>
            key
                .split('.')
                .filter(
                    (prop) =>
                        Number.isNaN(+prop) && !/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(prop),
                )
                .join('.');

        const allKeys = this.getAllKeys({ item: model }) as ModelT;
        const savedAllKeys = this.getAllKeys({ item: savedModel }) as ModelT;

        const clear = (value: any) => {
            if (['', null, undefined].includes(value)) {
                return '';
            }

            return value;
        };

        if (model.new) {
            Object.keys(allKeys).forEach((key) => {
                fields[key] = allKeys[key];
            });
        } else {
            Object.keys(allKeys).forEach((key) => {
                if (
                    (!this.notCheckFields || !this.notCheckFields.includes(key.split('.')[0])) &&
                    (!this.checkFields || this.checkFields.includes(clearKey(key))) &&
                    clear(allKeys[key]) !== clear(savedAllKeys[key]) &&
                    !deleteItems.find((item) => key.includes(item))
                ) {
                    // console.log(fields[key], allKeys[key], savedAllKeys[key], key);

                    fields[key] = allKeys[key];
                }
            });

            Object.keys(savedAllKeys).forEach((key) => {
                if (
                    (!this.notCheckFields || !this.notCheckFields.includes(key.split('.')[0])) &&
                    (!this.checkFields || this.checkFields.includes(clearKey(key))) &&
                    clear(allKeys[key]) !== clear(savedAllKeys[key]) &&
                    !deleteItems.find((item) => key.includes(item))
                ) {
                    // console.log(fields[key], allKeys[key], savedAllKeys[key]);
                    fields[key] = allKeys[key];
                }
            });
        }
    }

    if (withModel === true) {
        Object.keys(fields).forEach((key) => {
            const keys = key.split('.');
            let current = changedModel;
            let savedCurrent = savedModel;

            while (keys.length && savedCurrent) {
                let thisKey = keys.shift() as keyof typeof current;

                if (Array.isArray(savedCurrent)) {
                    const savedId = thisKey;

                    const [itemKey] = key.split(`.${savedId}`);

                    thisKey = savedCurrent
                        .findIndex((item: { _id: string }) => item._id === thisKey)
                        .toString() as never;

                    if (thisKey === '-1') {
                        const currentArr = this.getValue({
                            key: `${itemKey}.${savedId}`,
                        })?.model;

                        if (Array.isArray(currentArr)) {
                            const currentItem = currentArr?.find(
                                (innerItem: any) => innerItem._id === savedId,
                            );

                            const template = currentItem
                                ? model?.TEMPLATES?.[currentItem.TEMPLATE_NAME] || {}
                                : {};

                            if ((currentArr as any[])?.every((item) => typeof item !== 'object')) {
                                savedCurrent.push('');
                            } else {
                                savedCurrent.push({
                                    _id: savedId,
                                    ...JSON.parse(JSON.stringify(template)),
                                });
                            }

                            thisKey = (savedCurrent.length - 1).toString() as never;
                        }
                    }
                }

                if (
                    !current[thisKey] &&
                    (savedCurrent.hasOwnProperty(thisKey) || keys.length === 0)
                ) {
                    if (Array.isArray(savedCurrent[thisKey])) {
                        current[thisKey] = [] as never;
                    } else if (typeof savedCurrent[thisKey] === 'object' && savedCurrent[thisKey]) {
                        current[thisKey] = {
                            ...(Array.isArray(current) ? { _id: savedCurrent[thisKey]._id } : {}),
                        } as never;
                    } else {
                        current[thisKey] = fields[key] as never;
                    }
                }

                current = current[thisKey];
                savedCurrent = savedCurrent[thisKey];
            }
        });

        const checkEmptyArr = (thisModel: unknown) => {
            if (thisModel && typeof thisModel === 'object') {
                Object.keys(thisModel).forEach((key) => {
                    const thisProp = thisModel[key as keyof typeof thisModel];

                    if (Array.isArray(thisProp)) {
                        thisModel[key as keyof typeof thisModel] = (thisProp as any[]).filter(
                            (item) => item,
                        ) as never;

                        (thisProp as any[]).forEach((arrItem) => {
                            checkEmptyArr(arrItem);
                        });
                    } else if (thisProp && typeof thisProp === 'object') {
                        checkEmptyArr(thisProp);
                    }
                });
            }
        };

        checkEmptyArr(changedModel);
    }

    return {
        fields,
        ...(withModel === true ? { model: changedModel } : {}),
        deleteItems,
        isChange: Object.keys(fields).length > 0 || deleteItems.length > 0,
    };
};

export default checkChange;

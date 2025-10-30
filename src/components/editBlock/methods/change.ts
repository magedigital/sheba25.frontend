import sortAlphabet from '@functions/sortAlphabet.ts';

import EditBlockI, { ModelT } from '../types.ts';

const change: EditBlockI['change'] = function (this: EditBlockI, changedFields, modelName, prop) {
    return new Promise((resolve) => {
        this.setState(
            (state) => {
                const newState = { ...state } as EditBlockI['state'];
                const model = JSON.parse(
                    JSON.stringify(newState[(modelName || this.name) as keyof EditBlockI['state']]),
                );
                let error: EditBlockI['state']['error'];

                if (newState.error) {
                    error = undefined;
                }

                // console.log(changedFields, 123, prop);

                Object.keys(changedFields).forEach((key) => {
                    let resultKey = key;

                    if (prop) {
                        resultKey = `${prop}.${key}`;
                    }

                    const { model: resultModel, key: lastKey } = this.getValue({
                        model,
                        key: resultKey,
                    }) as ModelT;

                    if (resultModel) {
                        if (changedFields[key]?.FROM_ARRAY && !resultModel[lastKey]) {
                            resultModel[lastKey] = [];
                        }

                        if (Array.isArray(resultModel[lastKey])) {
                            if (Array.isArray(changedFields[key])) {
                                // && changedFields[key].length === 0
                                resultModel[lastKey] = changedFields[key];
                            } else if (
                                typeof changedFields[key] === 'object' &&
                                changedFields[key] !== null
                            ) {
                                resultModel[lastKey].push(changedFields[key]);
                            } else {
                                const index = resultModel[lastKey].indexOf(changedFields[key]);

                                if (index === -1) {
                                    resultModel[lastKey].push(changedFields[key]);
                                } else {
                                    resultModel[lastKey].splice(index, 1);
                                }

                                if (
                                    resultModel[lastKey].every((item) => typeof item === 'string')
                                ) {
                                    resultModel[lastKey].sort(sortAlphabet.bind(null, undefined));
                                }
                            }
                        } else {
                            resultModel[lastKey] = changedFields[key];
                        }
                    }
                });

                newState.updatedKey = new Date().getTime();
                newState[(modelName || this.name) as keyof EditBlockI['state']] = model;
                newState.error = error;

                return newState;
            },
            () => {
                if (typeof this.afterChange === 'function') {
                    this.afterChange(Object.keys(changedFields));
                }

                resolve();
            },
        );
    });
};

export default change;

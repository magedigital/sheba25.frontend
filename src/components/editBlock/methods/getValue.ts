import EditBlockI from '../types.ts';

type ModelT = {
    [s: string]: any;
};

const getValue: EditBlockI['getValue'] = function (this: EditBlockI, { model, key }) {
    if (model === undefined) {
        model = this.state[this.name as keyof EditBlockI['state']];
    }

    if (model) {
        const keys = key.split('.');
        let currentModel = model;
        let currentKey = keys.shift() as string;

        while (currentModel && keys.length > 0) {
            if (Array.isArray(currentModel)) {
                currentModel =
                    currentModel.find((innerItem) => innerItem._id === currentKey) ||
                    (currentModel as ModelT)[currentKey];
            } else {
                currentModel = currentModel[currentKey];
            }

            currentKey = keys.shift() as string;
        }

        return {
            model: currentModel,
            key: currentKey,
            value: currentModel?.[currentKey],
        };
    }

    return null;
};

export default getValue;

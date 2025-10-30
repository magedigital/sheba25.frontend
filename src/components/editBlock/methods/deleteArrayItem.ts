import EditBlockI, { ModelT } from '../types.ts';

const deleteArrayItem: EditBlockI['deleteArrayItem'] = function (
    this: EditBlockI,
    deleteFields,
    prop,
    modelName,
) {
    return new Promise((resolve) => {
        this.setState((state) => {
            const newState = { ...state } as EditBlockI['state'];
            const model = { ...newState[(modelName || this.name) as keyof EditBlockI['state']] };
            const deleteItems = [...(newState.deleteItems || [])];

            deleteFields.forEach((key) => {
                const { model: resultModel, key: lastKey } = this.getValue({
                    model,
                    key,
                }) as ModelT;

                if (resultModel) {
                    const index = resultModel.findIndex(
                        (item: ModelT) => item[prop || '_id'] === lastKey,
                    );

                    if (index !== -1) {
                        if (!resultModel[index].IS_TEMPLATE) {
                            deleteItems.push(key);
                        }

                        resultModel.splice(index, 1);
                    }
                }
            });

            newState.updatedKey = new Date().getTime();
            newState[(modelName || this.name) as keyof EditBlockI['state']] = model;
            newState.deleteItems = deleteItems;

            return newState;
        }, resolve);
    });
};

export default deleteArrayItem;

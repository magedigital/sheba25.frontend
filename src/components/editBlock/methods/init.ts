import EditBlockI from '../types.ts';

const init: EditBlockI['init'] = function ({ fields, start }) {
    return new Promise((resolve) => {
        if (fields) {
            const model = JSON.parse(JSON.stringify(fields));
            let savedModel = JSON.parse(JSON.stringify(fields));

            model.UPDATED_KEY = new Date().getTime();

            if (typeof this.getId === 'function' && this.getId() === 'new') {
                savedModel = {};
            }

            if (start) {
                delete savedModel._id;
            }

            this.setState(
                {
                    [this.name]: model,
                    ...(this.savedName ? { [this.savedName]: savedModel } : {}),
                    deleteItems: [],
                    error: undefined,
                    initedKey: new Date().getTime(),
                },
                resolve,
            );
        } else {
            resolve();
        }
    });
};

export default init;

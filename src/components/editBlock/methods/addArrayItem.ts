import EditBlockI, { ModelT } from '../types.ts';

const addArrayItem: EditBlockI['addArrayItem'] = async function (
    this: EditBlockI,
    { name, key, item = {} },
    modelName,
) {
    const { [modelName || this.name]: model } = this.state as ModelT;

    const template = model?.TEMPLATES && name ? model?.TEMPLATES[name] : {};

    if (Array.isArray(item)) {
        try {
            const ids: string[] = [];

            await Promise.all(
                ids.map(async (id, index) => {
                    await this.change(
                        {
                            [key]: {
                                ...JSON.parse(JSON.stringify(template)),
                                ...item[index],
                                _id: id,
                                IS_TEMPLATE: true,
                                FROM_ARRAY: true,
                                TEMPLATE_NAME: name,
                                isCreate: true,
                            },
                        },
                        modelName,
                    );
                }),
            );

            return ids;
        } catch (error) {}
    } else {
        try {
            const id = '';

            await this.change(
                {
                    [key]: {
                        ...JSON.parse(JSON.stringify(template)),
                        ...item,
                        _id: id,
                        IS_TEMPLATE: true,
                        FROM_ARRAY: true,
                        TEMPLATE_NAME: name,
                        isCreate: true,
                    },
                },
                modelName,
            );

            return id as string;
        } catch (error) {}
    }

    return null;
};

export default addArrayItem;

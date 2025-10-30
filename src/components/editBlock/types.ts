import React from 'react';

type ModelT = {
    [s: string]: any;
};

type StateT = {
    error?: string;
    deleteItems?: string[];
    initedKey?: number;
    updatedKey?: any;
    model?: ModelT;
    savedModel?: ModelT;
    loadingKey?: any;
    updatedListKey?: number;
};

type EditBlockFieldsT = Record<string, string | boolean | number | null>;

interface EditBlockI<S = {}, T = EditBlockI<S, {}>> extends React.Component<{}, S & StateT> {
    state: StateT & S;

    parent: React.RefObject<HTMLDivElement | null>;
    updateSocket?(e: CustomEvent): void;
    checkFields?: readonly string[];
    notCheckFields?: readonly string[];
    name: string;
    savedName: string;
    init(this: T, data: { fields: any; start?: boolean }): Promise<void>;
    getId?(): string | null | undefined;
    afterChange?(props: string[]): void;
    getSelectText(
        this: T,
        data: { model: ModelT; item: ModelT; parentKey?: string; key: string },
    ): string;
    getItemValue(
        this: T,
        data: { model: ModelT; item: ModelT; parentKey?: string; key: string },
    ): ModelT | null;
    getValue(data: {
        model?: ModelT;
        key: string;
    }): { model: ModelT; key: string; value: string | null | undefined } | null;
    change(changedFields: ModelT, modelName?: string, prop?: string): Promise<void>;
    deleteArrayItem(deleteFields: string[], prop?: string, modelName?: string): Promise<void>;
    addArrayItem(
        data: {
            name?: string;
            key: string;
            item: ModelT | ModelT[];
        },
        modelName?: string,
    ): Promise<string | string[] | null>;
    getAllKeys(this: T, data: { item: ModelT; parentKey?: string }): string[] | ModelT;
    checkChange(
        this: T,
        withModel?: boolean,
    ): {
        fields: ModelT;
        model?: Partial<ModelT>;
        deleteItems: StateT['deleteItems'];
        isChange: boolean;
    };
    getField(name: string): string;
    updateListKey(): void;
}

export default EditBlockI;

export type { EditBlockFieldsT, ModelT };

import I from '../types.ts';

const uploadHandler: I['uploadHandler'] = async function (name, e) {
    const target = e.target;
    const file = target.files![0];

    this.formData.set('act', file);

    document.dispatchEvent(
        new CustomEvent('setAnketField', {
            detail: { name, value: { name: file.name } },
        }),
    );
};

export default uploadHandler;

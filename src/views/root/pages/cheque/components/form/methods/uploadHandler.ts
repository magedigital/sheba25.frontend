import setAsyncState from '@functions/setAsyncState.ts';

import I from '../types.ts';

const uploadHandler: I['uploadHandler'] = async function (e) {
    const { setRenderKey } = this.props;
    const files = e.target.files!;

    if (this.state.files.length + Object.keys(files).length > 4) {
        // setError({ text: 'Можно загрузить до 4 изображений' });

        return;
    }

    const resultFiles = [...this.state.files];

    await Promise.all(
        Object.keys(files).map((name, key): Promise<void> => {
            const file = files[+name];

            const id = `file-${key}-${new Date().getTime()}`;

            this.formData.set(id, file);

            return new Promise((resolve) => {
                const fr = new FileReader();

                fr.onload = (response) => {
                    if (response.target) {
                        resultFiles.push({
                            id,
                            src: response.target.result as string,
                        });
                    }

                    resolve();
                };

                fr.readAsDataURL(file);
            });
        }),
    );

    await setAsyncState.call(this, { files: resultFiles });

    e.target.value = '';

    setRenderKey();
};

export default uploadHandler;

import I from '../types.ts';

const set: I['set'] = function ({ area, overHandler, leaveHandler, dropHandler }) {
    function preventDefaults(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        area.addEventListener(eventName, preventDefaults, false);
    });

    const isAdvancedUpload = (() => {
        const div = document.createElement('div');

        return (
            ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
            'FormData' in window &&
            'FileReader' in window
        );
    })();

    if (!isAdvancedUpload) {
        return;
    }

    area.addEventListener(
        'dragenter',
        () => {
            this.count++;

            overHandler();
        },
        false,
    );
    area.addEventListener(
        'dragleave',
        () => {
            this.count--;

            if (this.count === 0) {
                leaveHandler();

                this.count = 0;
            }
        },
        false,
    );
    area.addEventListener(
        'drop',
        (e) => {
            this.count = 0;

            dropHandler(e.dataTransfer!.files);
        },
        false,
    );
};

export default set;

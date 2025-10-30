import DragFile from '@classes/dragFile/DragFile.ts';

import I from '../types.ts';

const dragInit: I['dragInit'] = function () {
    const { onChange } = this.props;

    if (!this.isDragInit) {
        const area = this.parent.current as HTMLElement;

        const overHandler = () => this.setState({ isOver: true });
        const leaveHandler = () => this.setState({ isOver: false });
        const dropHandler = (files: FileList) => {
            onChange({ target: { files } });

            this.setState({ isOver: false });
        };

        new DragFile().set({ area, overHandler, leaveHandler, dropHandler });

        this.isDragInit = true;
    }
};

export default dragInit;

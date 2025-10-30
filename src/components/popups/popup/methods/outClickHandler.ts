import PopupI from '../types.ts';

const outClickHandler: PopupI['outClickHandler'] = function (e) {
    const { close, checkClose } = this.props;
    const inner = this.parent.current?.querySelector('.popup__inner') as HTMLElement;

    if (
        close &&
        inner &&
        e.target !== inner &&
        !inner.contains(e.target as HTMLElement) &&
        (!checkClose || checkClose())
    ) {
        close();
    }
};

export default outClickHandler;

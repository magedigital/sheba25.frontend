import setAsyncTimer from '@functions/setAsyncTimer.ts';

import I from '../types.ts';

const loadPopup: I['loadPopup'] = async function () {
    const { name } = this.props;
    const popup = this.popups[name];

    if (popup) {
        if (0) {
            await setAsyncTimer(1_000);
        }

        try {
            const PopupComponent = (await import(`@components/popups/${name}/${popup.name}.tsx`))
                .default;

            this.setState({ PopupComponent });
        } catch (error) {}
    }
};

export default loadPopup;

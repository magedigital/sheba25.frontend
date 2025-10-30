import { dispatcher, store } from '../redux/redux.ts';
import removeTransition from './removeTransition.ts';

window.mediaM = 700;

function setWindowParams() {
    const div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    const scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    window.widthValue = document.documentElement.clientWidth - scrollWidth;
    window.heightValue = document.documentElement.clientHeight;

    document.body.style.setProperty(`--wheight`, `${window.heightValue}px`);
}

function resize(isStart?: boolean): void {
    setWindowParams();

    if (isStart) {
        if (document.documentElement.clientWidth <= window.mediaM) {
            dispatcher({ type: 'device', data: 'mobile' });
        } else {
            dispatcher({ type: 'device', data: 'desktop' });
        }
    }

    if (window.widthPrevValue !== window.widthValue) {
        document.dispatchEvent(new CustomEvent('changeWidthWindow'));

        removeTransition({});
    }

    if (window.heightPrevValue !== window.heightValue) {
        document.dispatchEvent(new CustomEvent('changeHeightWindow'));

        if (!store.getState().isInputFocus) {
            dispatcher({ type: 'windowHeight', data: window.heightValue });

            const domInner = document.querySelector('.body__inner') as HTMLElement;

            if (domInner) {
                domInner.style.height = `${window.heightValue}px`;
            }

            setTimeout(() => {
                // setWindowParams();

                dispatcher({ type: 'windowHeight', data: window.heightValue });
            }, 10);
        }

        removeTransition({ item: '._PAGE', isCurrent: true });
    }

    if (!isStart) {
        if (window.widthPrevValue > window.mediaM && window.widthValue <= window.mediaM) {
            document.dispatchEvent(
                new CustomEvent('stateResize', {
                    detail: { type: 'mobile' },
                }),
            );
            dispatcher({ type: 'device', data: 'mobile' });
        }
        if (window.widthPrevValue <= window.mediaM && window.widthValue > window.mediaM) {
            document.dispatchEvent(
                new CustomEvent('stateResize', {
                    detail: { type: 'desktop' },
                }),
            );
            dispatcher({ type: 'device', data: 'desktop' });
        }
    }

    window.widthPrevValue = window.widthValue;
    window.heightPrevValue = window.heightValue;

    dispatcher({ type: 'windowWidth', data: window.widthValue });
}

export default resize;

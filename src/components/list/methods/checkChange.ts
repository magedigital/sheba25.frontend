import I from '../types.ts';

const checkChange: I['checkChange'] = function (force) {
    const { renderKey, updateKey, forceRenderKey, disabled, windowIsLoad } = this.props;

    if (disabled) {
        return;
    }

    if (
        renderKey !== this.renderKey ||
        updateKey !== this.updateKey ||
        forceRenderKey !== this.forceRenderKey ||
        (windowIsLoad && this.windowIsLoad !== windowIsLoad) ||
        force
    ) {
        this.updateItems({
            isRender:
                renderKey !== this.renderKey ||
                forceRenderKey !== this.forceRenderKey ||
                this.windowIsLoad !== windowIsLoad,
            isUpdate:
                updateKey !== this.updateKey ||
                forceRenderKey !== this.forceRenderKey ||
                this.windowIsLoad !== windowIsLoad,
        });

        this.renderKey = renderKey;
        this.updateKey = updateKey;
        this.forceRenderKey = forceRenderKey;
        this.windowIsLoad = windowIsLoad;
    }
};

export default checkChange;

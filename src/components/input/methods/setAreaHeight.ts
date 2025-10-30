import getRealParams from '../../../functions/getRealParams.ts';

import InputI from '../types.ts';

const setAreaHeight: InputI['setAreaHeight'] = function () {
    const { calcHeight, textarea, calcHeightCb, minHeight, maxHeight } = this.props;

    if (textarea && calcHeight) {
        const area = this.parent.current as HTMLElement;

        let { scrollHeight: areaHeight } = getRealParams({
            parent: area,
            elem: '.input__field',
            width: area.offsetWidth,
            isClearStyles: true,
            // isNotRemove: true,
        });

        const resultMinHeight = typeof minHeight === 'function' ? minHeight() : 32;
        const resultMaxHeight = typeof maxHeight === 'function' ? maxHeight() : undefined;

        if ((areaHeight as number) < resultMinHeight) {
            areaHeight = resultMinHeight;
        }

        if (resultMaxHeight && (areaHeight as number) > resultMaxHeight) {
            areaHeight = resultMaxHeight;
        }

        area.style.height = `${areaHeight}px`;

        const field = area.querySelector('.input__field') as HTMLElement;

        if (field) {
            field.scrollTop = areaHeight as number;
        }

        if (typeof calcHeightCb === 'function') {
            calcHeightCb();
        }
    }
};

export default setAreaHeight;

import InputI from '../types.ts';

const resize: InputI['resize'] = function () {
    this.setAreaHeight();
};

export default resize;

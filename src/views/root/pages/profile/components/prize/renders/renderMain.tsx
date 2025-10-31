import React from 'react';

import I from '../types.ts';

const renderMain: I['renderMain'] = function () {
    return (
        <div className="prize__main _FULL">
            {this.renderHead()}
            {this.renderPreview()}
            {this.renderFoot()}
        </div>
    );
};

export default renderMain;

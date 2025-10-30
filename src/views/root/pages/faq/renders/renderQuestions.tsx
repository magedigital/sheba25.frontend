import React from 'react';

import Question from '../components/question/Question.tsx';

import I from '../types.ts';

const renderQuestions: I['renderQuestions'] = function () {
    const { content } = this.state;
    const { is5ka } = this.props;
    const questions = is5ka ? content!.components['5ka'] : content!.components.faq;

    return (
        <div className="faq__items _FULL_W">
            {questions.map((question, index) => (
                <div className="faq__item _FULL_W" key={index}>
                    <Question question={{ ...question, key: index + 1 }} />
                </div>
            ))}
        </div>
    );
};

export default renderQuestions;

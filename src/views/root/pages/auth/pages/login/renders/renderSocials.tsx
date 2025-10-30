import React from 'react';

import I from '../types.ts';

const renderSocials: I['renderSocials'] = function () {
    const socAuthUrls = window.socAuthUrls;

    return (
        <div className="popup__socials _COL _COL_H_CENTER">
            <p className="popup__socialsTitle">Авторизоваться через</p>
            <div className="popup__socialsItems _ROW">
                {(Object.keys(this.socials) as (keyof typeof this.socials)[]).map((name) => {
                    const social = this.socials[name];
                    let href: string | undefined;

                    if (name === 'vk') {
                        href = socAuthUrls?.VK;
                    }

                    if (name === 'mail') {
                        href = socAuthUrls?.MailRU;
                    }

                    if (name === 'ya') {
                        href = socAuthUrls?.Yandex;
                    }

                    if (name === 'ok') {
                        href = socAuthUrls?.OK;
                    }

                    return (
                        <span
                            className="popup__socialsItem _CLICK _COL _COL_CENTER"
                            key={name}
                            onClick={() => {
                                const hrefWindow = window.open(href, '_blank');

                                this.timers[name] = setInterval(() => {
                                    if (hrefWindow && hrefWindow.closed) {
                                        clearInterval(this.timers[name]);

                                        window.location.reload();
                                    }
                                }, 500);
                            }}
                        >
                            <img
                                src={require(`@media/socials/${social.logo}`)}
                                alt=""
                                className="popup__socialsItemIcon"
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default renderSocials;

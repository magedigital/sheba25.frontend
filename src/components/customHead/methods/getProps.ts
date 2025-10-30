import CustomHeadI, { HelmetPropsT } from '../types.ts';

const getProps: CustomHeadI['getProps'] = function () {
    const { title, description, keywords, link, image } = this.props;

    const propsHead: HelmetPropsT = {
        meta: [
            { property: 'og:site_name', content: 'Livecargo.ru' },
            { property: 'og:type', content: 'website' },
        ],
    };

    if (title) {
        propsHead.title = title;
        propsHead.meta.push({
            name: 'twitter:title',
            content: title,
        });
        propsHead.meta.push({
            property: 'og:title',
            content: title,
        });
    }

    if (description) {
        propsHead.meta.push({
            name: 'description',
            content: description,
        });
        propsHead.meta.push({
            name: 'twitter:description',
            content: description,
        });
        propsHead.meta.push({
            property: 'og:description',
            content: description,
        });
    }

    if (image) {
        propsHead.meta.push({
            property: 'image',
            content: image,
        });
        propsHead.meta.push({
            property: 'twitter:card',
            content: 'summary_large_image',
        });
        propsHead.meta.push({
            property: 'twitter:image',
            content: image,
        });
    }

    if (link) {
        propsHead.meta.push({
            name: 'twitter:domain',
            content: process.env.REACT_APP_DOMEN as string,
        });
        propsHead.meta.push({
            name: 'twitter:url',
            content: link,
        });
        propsHead.meta.push({
            property: 'og:url',
            content: link,
        });
    }

    if (keywords) {
        propsHead.meta.push({
            name: 'keywords',
            content: keywords,
        });
    }

    return propsHead;
};

export default getProps;

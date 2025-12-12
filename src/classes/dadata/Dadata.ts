import get from './methods/get';

export default class Dadata {
    token = window.daDataToken;
    url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

    get = get;
}

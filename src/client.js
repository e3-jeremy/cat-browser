/**
 * Next we will register thePassport apikey as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every apikey manually.
 */

// const apikey = 'Dc24f1e24-5e8a-4c65-a2d0-1646a9ea89ce'
const apikey = '205db457-cfe6-4977-a967-3f3cc207dc01'

let axios = (function() {
    let _axios = null;
    try {
        _axios = require('axios');
    } catch (e) {
        console.error('Axios package not available');
    }

    if(_axios) {
        _axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRe/quest';
        _axios.defaults.headers.common['Cache-Control'] = 'no-cache ';
        _axios.defaults.headers.common['Accept'] = 'application/json';
        // _axios.defaults.headers.common['Connection'] = 'keep-alive';
        _axios.defaults.headers.common['Content-Type'] = 'application/json';

        if (apikey) {
            _axios.defaults.headers.common['x-api-key'] = apikey;

            // declare a response interceptor
            _axios.interceptors.response.use(
                (response) => {
                    return response;
                },
                (error) => {
                    // Made an action befor promise return
                    // handle the response error
                    return Promise.reject(error);
                }
            );

        } else {
            // do something, or
            // Break the site
        }
    }

    return _axios;
})();

export default axios;

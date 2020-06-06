import axios from '~/client';
import _ from 'lodash';

const namespaced = true;

const state = {
    breed_id: '',
    all: [],
    count: 0,
    limit: 10,
    page:0,
    status: '',
}

const getters = {
    showLoadMore: state => {
        let show = (state.count > (state.page * state.limit));
        return show
    },
    emptyList: state => !!_.isEmpty(state.all),
    requestStatus: state => state.status,
    breedId: state => state.breed_id,
}

const mutations = {
    'BREED_ID': (state, id) => {
        if(state.breed_id != id) {
            // Empty list since new breed was selected
            state.all = [];
        }
        state.breed_id = id;
    },
    'LIST': (state, list) => {
        // state.all.concat(list);
        state.all = [
            ...state.all,
            ...list
        ];
    },
    'META': (state, headers) => {
        // This is to reset when new breed was selected
        if (!headers) {
            state.count = 0;
            state.limit = 10;
            state.page = 0;
            return;
        }
        if(headers['pagination-count']) state.count = headers['pagination-count'];
        // if(headers['pagination-limit'])state.limit = headers['pagination-limit'];
        if(headers['pagination-page']) state.page = headers['pagination-page'];
    },
    'REQUEST_ONPROCESS': (state) => {
        state.status = 'loading';
    },
    'REQUEST_SUCCESS': (state) => {
        state.status = 'success';
    },
    'REQUEST_ERROR': (state) => {
        state.status = 'error';
    },
}

const actions = {
    'FETCH_LIST_OF_CATS': (context, breed) => {
        context.commit('REQUEST_ONPROCESS');

        let page = 1;
        let limit = context.state.limit;
        if(!breed) {
            // This is from click event of load more
            breed = context.state.breed_id;
            page = parseInt(context.state.page) + 1;

        } else {
            // New breed was selected
            context.commit('META', null);
            context.commit('BREED_ID', breed);
        }

        return new Promise((resolve, reject) => {
            axios.get('https://api.thecatapi.com/v1/images/search?page=' + page + '&limit=' + limit + '&breed_id=' + breed)
            .then(response => {
                context.commit('REQUEST_SUCCESS');
                // console.log(response);
                context.commit('LIST', response.data);
                context.commit('META', response.headers);
                resolve(response)
            })
            .catch(error => {
                context.commit('REQUEST_ERROR');
                console.log(error);
                reject(error)
            })
        })
    }
}

const module = {
    namespaced,
    state,
    getters,
    mutations,
    actions
};

export default module;

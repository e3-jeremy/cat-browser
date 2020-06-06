import axios from '~/client';

const namespaced = true;

const state = {
    all: [],
    status: ''
}

const getters = {
    requestStatus: state => state.status,
}

const mutations = {
    'LIST': (state, list) => {
        state.all = list;
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
    'FETCH_LIST_OF_BREEDS': (context) => {
        context.commit('REQUEST_ONPROCESS');
        return new Promise((resolve, reject) => {
            axios.get('https://api.thecatapi.com/v1/breeds')
            .then(response => {
                context.commit('REQUEST_SUCCESS');
                // console.log(response);
                context.commit('LIST', response.data);
                resolve(response)
            })
            .catch(error => {
                context.commit('REQUEST_ERROR');
                console.log(error);
                reject(error)
            })
        })
    },
    'SET_LIST_OF_BREEDS': (context, data) => {
        context.commit('LIST', data);
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

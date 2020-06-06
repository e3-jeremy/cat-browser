import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import BreedModule from './modules/Breed'
import CatModule from './modules/Cat'

const store = new Vuex.Store ({
    modules: {
        BREED: BreedModule,
        CAT: CatModule
    }
})

export default store;

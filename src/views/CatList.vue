<template>
    <div class="">
        <search />
        <el-row>
            <el-col class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" v-for="(cat, index) in cats" :key="index">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="cat-image-item" :style="'background-image: url(' + cat.url + '), url(/images/paw.png);'">
                    </div>
                    <div class="bottom clearfix px-4 text-center">
                        <router-link :to="'/' + cat.id">
                            <el-button type="text" class="btn-primary button">View Details</el-button>
                        </router-link>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div v-show="(showLoadMore || loading) && page > 0" class="text-center py-4" style="position: static; bottom: 0;">
            <el-button type="primary" :loading="loading" @click="FETCH_LIST_OF_CATS()">{{ loadText }}</el-button>
        </div>
        <loader :loading="loading"/>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
    data() {
        return {
            loadText: 'Load More',
            loading: false
        }
    },
    computed: {
        ...mapState('CAT', {
            cats: 'all',
            page: 'page'
        }),
        ...mapGetters('CAT', [
            'showLoadMore',
            'status'
        ])
    },
    watch: {
      status: function (status) {
          // Manipulate the load more button
        if (status == 'loading') {
            this.loadText = 'Loading';
            this.loading = true;
            return;
        }
        this.loadText = 'Load More';
        this.loading = false;
      }
    },
    methods: {
        ...mapActions('CAT', [
            // When load more button was clicked
            'FETCH_LIST_OF_CATS'
        ])
    }
}
</script>

<style lang="scss"  scoped>
.cat-image-item {
    width: 100%;
    height: 238px;
    background-color: transparent;
    background-position: center;
    background-size: cover;
    position: relative;
    // background-blend-mode: saturation;
}
</style>

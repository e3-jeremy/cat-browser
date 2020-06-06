<template>
    <div>
        <div v-show="loaded && !error" :style="'margin: 0 auto; max-width: '  + catDetails.width + 'px'">
            <el-card :body-style="{ padding: '0px' }">
                <el-header>
                    <el-button class="mt-2" type="primary" @click="back">BACK</el-button>
                </el-header>
                <img :src="catDetails.url" alt="">
                <div style="padding: 14px;">
                    <div class="bottom clearfix">
                        <h2 class="mt-3 mb-3">{{ catDetails.breeds.name }}</h2>
                        <p class="text-bold">Origin: {{ catDetails.breeds.origin }}</p>
                        <p class="text-bold">{{ catDetails.breeds.temperament }}</p>
                        <p class="">{{ catDetails.breeds.description }}</p>
                    </div>
                </div>
            </el-card>
        </div>
        <loader :loading="!loaded"/>
        <Page404 v-show="(error == 404 || error == 400) && loaded"/>
        <Page500 v-show="error === 500 && loaded"/>
    </div>
</template>

<script>
import axios from '~/client';
export default {
    data() {
        return {
            error: false,
            loaded: false,
            catDetails: {
                breeds: {}
            }
        }
    },
    methods: {
        back () {
            // Back 1 history
             this.$router.go(-1);
        }
    },
    mounted () {
        console.log('mounted');
        let self = this
        axios.get('https://api.thecatapi.com/v1/images/' + this.$route.params.catid)
        .then(response => {
            self.catDetails = response.data;
            // Format for easy access
            self.catDetails.breeds = response.data.breeds[0];
            //  Then hide the spinner
            self.loaded = true;
            self.error = false;
        })
        .catch(error => {
            // This is tio hide the spinner
            self.loaded = true;

            if (!error.response) {
                return self.error = 500;
            }
            // Show error page
            self.error = error.response.status;

            console.log(error);
            console.log(error.response);
        })
    }
}
</script>

<style lang="css" scoped>
img {
    max-width: 100%;
}
.text-bold {
    font-weight: bold;
}
</style>

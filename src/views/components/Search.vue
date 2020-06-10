<template>
    <el-form ref="form">
        <el-form-item xlabel="Breeds">
            <el-select 
                v-model="selected_id"  
                placeholder="Please Select Breed" 
                size="large" 
                :loading="loading" 
                @change="selectOnChange" 
                style="width:50%">
                <el-option
                    v-for="item in breeds"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            </el-form-item>
        <blockquote  v-show="showQoute">
            <div class="blockquote-content">
                <p class="oblique">
                    People who don't like cats were probably mice in an earlier life.
                </p>
            </div>
        </blockquote>
    </el-form>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            loading: true,
            selected_id: sessionStorage.getItem('breed_id') || ''
        }
    },
    computed: {
        ...mapState('BREED', {
            breeds: 'all',
            status: 'status'
        }),
        ...mapGetters('CAT', [
            'breedId',
            'showQoute'
        ])
    },
    watch: {
        breedId: function (breed) {
            this.selected_id = breed;
        },
        status: function (status) {
            if (status == 'loading') {
                this.loading = true;
                return;
            }
            this.loading = false;
        }
    },
    methods: {
        ...mapActions('BREED', [
            'SET_LIST_OF_BREEDS',
            'FETCH_LIST_OF_BREEDS'
        ]),
        ...mapActions('CAT', [
            'FETCH_LIST_OF_CATS'
        ]),
        selectOnChange () {
            // Catch the change event os select input
            sessionStorage.setItem('breed_id', this.selected_id)
            this.FETCH_LIST_OF_CATS(this.selected_id)
        },
        removeBreedInSession () {
            // This will be trigger when page refresh
            // This is to remove selected breed,
            // only use the storage when comnig back from single page.
            sessionStorage.removeItem('breed_id');
        }
    },
    created() {
        window.addEventListener('beforeunload', this.removeBreedInSession)
    },
    mounted () {
        let breeds = JSON.parse(sessionStorage.getItem('breeds'));
        // Fetch the data from storage to not to send an api request
        if(breeds) {
            this.loading = false;
            return this.SET_LIST_OF_BREEDS(breeds);
        }

        this.FETCH_LIST_OF_BREEDS()
        .then((response) => {
            sessionStorage.setItem('breeds', JSON.stringify(response.data));
        })
    }
}
</script>

<style lang="scss" scoped>

</style>

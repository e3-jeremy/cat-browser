<template>
    <div>
        <div v-show="!loading" class="error container">
          <div class="row align-items-center">
            <div class="col-md-12 px-5 text-center">
              <img src="/images/404-error.jpg" class="w-80">
            </div>
            <div class="col-md-12 text-center mt-4">
              <h5>Click <router-link to="/">here</router-link> to go back or contact our support to report this.</h5>
            </div>
          </div>
        </div>
        <loader :loading="loading"/>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            default: true
        }
    },
    data () {
        return {
            // loading: true
        }
    },
    mounted () {
        let self = this;

        // Delay to make spinner standout
        setTimeout(function () {
            self.loading = false;
        }, 3000);
    }
}
</script>

<style lang="css" scoped>
img {
    max-width: 100%;
    
    -webkit-filter: hue-rotate(170deg) drop-shadow(2px 2px 10px rgba(0,0,0,0.4)); /* Safari 6.0 - 9.0 */
    filter: hue-rotate(170deg) drop-shadow(2px 2px 10px rgba(0,0,0,0.4));
}
</style>

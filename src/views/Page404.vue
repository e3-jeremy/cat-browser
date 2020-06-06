<template>
    <div>
        <div v-show="!loading" class="error container">
          <div class="row align-items-center">
            <div class="col-md-12 px-5 text-center">
              <img src="/images/404-error.jpg" class="w-80">
            </div>
            <div class="col-md-12 text-center mt-4">
              <h1 class="bold mb-3">Page not found</h1>
              <h5>Click <router-link to="/">here</router-link> to go back or contact our support to report this.</h5>
            </div>
          </div>
        </div>
        <loader :loading="loading"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            loading: true
        }
    },
    mounted () {
        let self = this;

        // Delay to make spinner standout
        setTimeout(function () {
            self.loading = false;
        }, 1000);
    }
}
</script>

<style lang="css" scoped>
img {
    max-width: 100%;
}
</style>

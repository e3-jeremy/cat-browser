<template>
    <div>
        <div v-show="!loading" class="error container">
          <div class="row align-items-center">
            <div class="col-md-12 px-5 text-center">
              <img src="/images/500-error.jpg" class="w-80">
              <slot></slot>
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
    -webkit-filter: hue-rotate(125deg) drop-shadow(2px 2px 10px rgba(0,0,0,0.6)); /* Safari 6.0 - 9.0 */
    filter: hue-rotate(125deg) drop-shadow(2px 2px 10px rgba(0,0,0,0.6));
}
.error {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
</style>

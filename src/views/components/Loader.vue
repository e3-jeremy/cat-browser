<template>
    <div v-show="loading" class="loader">
        <div class="track">
            <div class="mouse">
            </div>
        </div>
        <div class="face">
            <div class="ears-container">

            </div>
            <div class="eyes-container">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="phiz">
                <div class="nose"></div>
                <div class="lip"></div>
                <div class="mouth"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['loading']
}
</script>

<style lang="scss" scoped>

</style>

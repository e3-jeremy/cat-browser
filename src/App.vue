<template>
    <div>
        <nav class=" border-bottom py-3">
            <el-row>
                <el-col :xs="24" :sm="24" :md="24">
                    <div class="container">
                    <h4 class="title">Cat Browser</h4>
                    </div>
                </el-col>
            </el-row>
        </nav>
        <div id="app" class="container  py-4">
            <router-view />
        </div>
    </div>
</template>

<script>
import './scss/style.scss'

export default {
}
</script>

<style scoped>
    .title {
        padding-left: 40px;
        position: relative;
        float: right;
    }
    .title::before {
        content: "🐱";
        display: block;
        position: absolute;
        left: 0;
        font-size: 20px;
        top: 2px;

    }
</style>

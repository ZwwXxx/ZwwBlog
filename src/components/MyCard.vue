<template>
    <el-card class="box-card cardBox">
        <slot>

        </slot>
    </el-card>
</template>

<script>
export default {
    name: "MyCard"
}
</script>

<style scoped>
.cardBox {
    width: 70%;
    margin: auto;
    padding: 0 !important;

}

</style>

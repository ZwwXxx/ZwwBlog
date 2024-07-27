<template>
    <div class="archiveBox">
        <BgBoard title="归档" content="用文字留下岁月的痕迹"/>
        <el-card class="box-card cardBox">

        </el-card>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";

export default {
    name: "Archive",
    components: { BgBoard}
}
</script>

<style scoped>
.archiveBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}
.cardBox {
    width: 60%;
    margin: auto;
    padding: 0 !important;

}
</style>

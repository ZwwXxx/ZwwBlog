<template>
<el-row style="padding: 0 20px">
  <el-card class="box-card cardBox">
    <slot>

    </slot>
  </el-card>
</el-row>
</template>

<script>
export default {
  name: "MyCard"
}
</script>

<style scoped>
.cardBox {
  max-width: 880px;
  margin: 0 auto;
  padding: 0  !important;

}

</style>

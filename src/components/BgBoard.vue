<template>
    <div class="BgBox">
        <div class="title">{{title}}</div>
        <div class="content">{{content}}</div>
    </div>
</template>

<script>
export default {
    name: "BgBoard",
    props:['title','content']
}
</script>

<style scoped>
.BgBox {
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    background: var(--bg1);
    color: var(--text-color);
    margin-bottom: 40px;
}
.title{
    font-size: 50px;
    font-weight: bolder;
}
.content{
    font-size: 20px;
}

</style>

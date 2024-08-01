<template>
    <div class="BgBox">
        <div class="title">{{title}}</div>
        <div class="content">{{content}}</div>
        <slot></slot>
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
    height: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    /*background: var(--bg1);*/
    /*color: var(--text-color);*/
    position: relative;
    color: white;
    z-index: 10;
    margin-bottom: 20px;
}
.BgBox:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2); /* 调整透明度和颜色 */
    backdrop-filter: blur(10px);
    z-index: 1;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.title{
    font-size: 50px;
    font-weight: bolder;
    z-index: 10;
}
.content{
    font-size: 20px;
    z-index: 10;
}

</style>

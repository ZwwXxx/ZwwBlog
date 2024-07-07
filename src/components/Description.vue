<template>
    <div class="desc">
        <img src="@/assets/images/微信图片_20240701112347.jpg" class="avatar" alt="avatar">
        <div class="author-name">Zww</div>
        <div class="saying">尽人事，听天命</div>
    </div>
</template>

<script>
export default {
    name: "Description"
}
</script>

<style scoped>
.desc {
    text-align: center;
}

.avatar {
    margin: 45px 0 15px 0;
    padding: 5px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 10px black;
}

.author-name {
    padding: 20px 0;
    background-image: linear-gradient(to right, #ff6b6b, #ffa500, #ffff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 20px;
    font-weight: bolder;
}

.saying {
    padding: 20px 0;
    background-image: linear-gradient(to right, #00b4d8, #0077b6, #0096c7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: 'Times New Roman', Times, serif;
    text-shadow: 0 0px 3px #ffc400;
}

</style>

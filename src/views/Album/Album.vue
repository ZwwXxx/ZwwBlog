<template>
    <div class="albumBox">
        <BgBoard title="相册" content="用镜头捕捉光影中的美好"/>
        <MyCard>
            <div class="cardBody">
                <div style="position: relative" class="singleCategory"
                @click="jumpTo('风景')"
                >
                    <div class="img"><img src="https://cdn.zww0891.fun/wallhaven-1pv19v_1920x1080.png" alt="">
                    </div>
                    <div class="description">风景</div>
                    <div class="subDescription ">记录美好瞬间</div>
                </div>
                <div style="position: relative" class="singleCategory"
                     @click="jumpTo('美食')"
                >
                    <div class="img"><img src="https://cdn.zww0891.fun/burger%20%282%29.jpg" alt="">
                    </div>
                    <div class="description">美食</div>
                    <div class="subDescription ">唯有美食不可辜负</div>
                </div>
                <div style="position: relative" class="singleCategory"
                     @click="jumpTo('日常')">
                    <div class="img"><img src="https://cdn.zww0891.fun/wallhaven-o53gpm_1920x1080.png" alt="">
                    </div>
                    <div class="description">日常</div>
                    <div class="subDescription ">一张照片,一段回忆</div>
                </div>
                <div style="position: relative" class="singleCategory"
                     @click="jumpTo('合照')">
                    <div class="img"><img src="https://cdn.zww0891.fun/1a460fa541c1482cb8befc870e7c3bbf.jpg" alt="">
                    </div>
                    <div class="description">合照</div>
                    <div class="subDescription ">一起走过的时光</div>
                </div>
            </div>
        </MyCard>
    </div>

</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "Album",
    components: {MyCard, BgBoard},
    data() {
        return {
            url: 'https://cdn.zww0891.fun/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701112347.jpg'
        }
    },
    methods:{
        jumpTo(category){
            this.$router.push({
                name:'Photos',
                params:{
                    id:category
                }
            })
        }
    }
}
</script>

<style scoped>
.albumBox {
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}



.cardBody {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    div {
        /*width: 200px;*/
        height: 140px;
    }
}

img {
    width: 100%;
    height: 100%;
}

.singleCategory {
    position: relative;
    transition: 0.25s ease-in-out;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
}
.singleCategory img{
    transition: 0.25s ease-in-out;
}
.singleCategory:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-6px);
    img{
        filter: brightness(130%);
    }
}

.description {
    font-size: 20px;
    font-weight: bolder;
    position: absolute;
    top: 18px;
    left: 20px;
    color: var(--bg1);
}

.subDescription {
    font-size: 15px;
    font-weight: bolder;
    position: absolute;
    top: 45px;
    left: 20px;
    color: var(--bg1);
}
</style>

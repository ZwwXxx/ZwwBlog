<template>
    <div class="photosBox">
        <BgBoard :title="`图库-${this.$route.params.id}`"/>
        <MyCard>
            <div class="cardBody">
                <div style="position: relative" class="singleCategory"
                     v-for="(item,index) in photos" :key="index"
                >
                    <div class="img" >
                        <el-image
                                :src="item.url"
                                :preview-src-list="srcList"
                                style="width: 100%;height: 100%;"
                                lazy
                        ></el-image>
                    </div>
                </div>
            </div>
        </MyCard>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import {selectList} from "@/api/photo";
import MyCard from "@/components/MyCard.vue";

export default {
    name: "Photos",
    components: {MyCard, BgBoard},
    data() {
        return {
            photos: [],
            srcList: []
        }
    },
    mounted() {
        this.getPhotosData(this.$route.params.id)

    },
    methods: {
        getPhotosData(categoryName) {
            selectList(1, 999, {category: categoryName}).then(res => {
                if (res.code === 20000) {
                    this.photos = res.rows
                    this.srcList = this.photos.map(item => item.url)
                    console.log(this.srcList)
                }
            })
        }
    }
}
</script>

<style scoped>
.photosBox {
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

img{
    width: 100%;
    height: 100%;
}

.singleCategory {
    position: relative;
    transition: 0.18s ease-in-out;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;

}

.singleCategory img {
    transition: 0.25s ease-in-out;
}

.singleCategory:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-8px);

    img {
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

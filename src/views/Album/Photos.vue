<template>
    <div class="photosBox">
        <BgBoard :title="`图库-${this.$route.params.id}`"/>
        <el-card class="box-card cardBox">
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
        </el-card>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import {selectList} from "@/api/photo";

export default {
    name: "Photos",
    components: {BgBoard},
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
                    this.photos = res.data.records
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
    padding-top: 60px;
    min-height: calc(100vh - 70px);
}

.cardBox {
    width: 60%;
    margin: auto;
    padding: 0 !important;

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

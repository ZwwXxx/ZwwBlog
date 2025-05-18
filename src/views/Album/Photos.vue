<template>
  <div class="photosBox">
    <BgBoard :title="`图库-${this.$route.params.id}`"/>
    <MyCard>
      <div class="cardBody">
        <div style="position: relative" class="singleCategory"
             v-for="(item,index) in photos" :key="index"
        >
          <div class="img" slot="error">
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
      srcList: [],
      queryParams: {
        category: this.$route.params.id
      }
    }
  },
  mounted() {
    this.getPhotosData()

  },
  methods: {
    getPhotosData() {
      selectList(this.queryParams).then(res => {
        if (res.code === 200) {
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
  grid-gap: 10px;
  //grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  div {
    /*width: 200px;*/
    height: 140px;
  }
}
/**
min-width为临界点，比这个宽度大的就显示对应的布局
必须小的在上面，因为后面覆盖前面，如果小屏不符合在以大屏为主展示
如果大的在上面，会出现min大于330也就是超小屏，当当前视口为1080时，小屏也符合条件，覆盖大屏@medie监视样式
也就是说，他既然不大于350.那后面大屏的宽度范围也不满足，因此不会冲突覆盖
 */


/**
大于150一列展示，后面以此类推
 */

@media (min-width: 0px) {
  .cardBody {
    grid-template-columns: repeat(1,1fr);
  }
}
@media (min-width: 400px) {
  .cardBody {
    grid-template-columns: repeat(2,1fr);
  }
}
@media (min-width: 550px) {
  .cardBody {
    grid-template-columns: repeat(3,1fr);
  }
}
@media (min-width: 750px) {
  .cardBody {
    grid-template-columns: repeat(4,1fr);
  }
}

img {
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

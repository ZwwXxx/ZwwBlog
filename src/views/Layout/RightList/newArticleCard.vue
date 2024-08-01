<template>
    <div class="new-article-card">
        <el-row >
            <el-col :span="6">
                <div class="thumbnail-img">
                    <img class="thumbnail" :src="cover" :alt="article.title">
                </div>
            </el-col>
            <el-col :span="16" :offset="2" style="padding: 5px">
                <el-row>
                    <div class="article-title"   @click="$router.push({path: `/articleDetail/${article.id}`})">
                        {{ article.title }}
                    </div>
                </el-row>
                <el-row>
                    <div class="article-create-time">
                        {{ article.createTime | formatDate }}
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    name: "newArticleCard",
    props:['article'],

    filters: {
        formatDate(date) {
            // 如果要展示多少天前格式
            const de = new Date(date);
            let year = de.getFullYear();
            let month = (de.getMonth() + 1).toString().padStart(2, '0');
            let day = de.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    computed: {
        cover() {
            if (!this.article.thumbnail || this.article.thumbnail === '') {
                return "https://cdn.zww0891.fun/20247291703.png";
            } else {
                console.log(1)
                return this.article.thumbnail;
            }
        }
    },

}
</script>

<style scoped>

.article-title {
    font-size: 16px;
    font-weight: 500;
    transition: color 0.3s ease;

}

.article-title:hover{
    color:#39C5BBFF ;
}

.new-article-card {
    margin: 10px 0 ;
    padding: 5px 0;
    border-radius: 8px;
    cursor: pointer;
    transition:  0.4s ease;
}

.new-article-card:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
}
.new-article-title p {
    margin-left: 5px;
}
.thumbnail-img{
    border-radius: 8px;
    margin-left: 10px;
    width: 65px;
    height: 65px;
    overflow: hidden;
}
.thumbnail{
    transition: transform 0.6s;
    width: 100%;
    height: 100%;

}
.thumbnail-img:hover .thumbnail {
    transform-origin: 50% 50%; /* 以中心点为原点 */
    transform: scale(1.2); /* 放大1.5倍 */
}
.article-create-time{
    margin-top: 6px;
}

</style>

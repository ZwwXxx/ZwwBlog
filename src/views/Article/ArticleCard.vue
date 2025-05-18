<template>
  <!-- 文章内容-->
  <!--  缩放进入动画-->
    <DelayShow>
        <!--每个文章卡片-->
        <div class="article-card " @click="openArticle(article.id)" v-show="!$store.state.loading">
            <!--文章封面-->
            <el-row>
                <div class="articleCover">
                    <!--封面图片-->
                    <img class="thumbnail-img" :src="article.thumbnail" alt="">
                    <!--文章摘要-->
                    <div class="article-summary-box">
                        <div class="article-summary-content">
                            「{{ article.summary }}」
                        </div>
                    </div>
                </div>
            </el-row>
            <el-row>
                <!--文章标题-->
                <div class="article-title">
                    {{ article.title }}
                </div>
            </el-row>
            <!--创建，更新时间-->
            <el-row>
                <div class="create-update-time">
                    <div class="post-data">
                        <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;"
                             version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="6922">
                            <path
                                    d="M710.845279 290.500257c24.26566 0 45.345768-19.693528 45.345768-44.002167L756.191046 46.52871c0-24.308639-21.081131-44.023656-45.345768-44.023656-24.286126 0-43.958164 19.715017-43.958164 44.023656l0 199.969381C666.887115 270.806729 686.559153 290.500257 710.845279 290.500257zM623.079376 113.343441 400.514371 113.343441l0 66.468854 222.565005 0L623.079376 113.343441zM883.474988 113.343441l-82.717933 0 0 66.100464 85.881996 0c25.261337 0 46.579875 21.361517 46.579875 46.645366l0 153.823388L90.398358 379.912659l0-153.823388c0-25.282826 21.318538-46.645366 46.579875-46.645366l86.444814 0L223.423047 113.343441l-82.58695 0c-64.042595 0-116.428709 52.473095-116.428709 116.624161l0 676.342975c0 64.130599 50.457182 116.601648 114.499777 116.601648L883.474988 1022.912226c64.019059 0 116.427686-52.471049 116.427686-116.601648L999.902674 229.967602C999.902674 165.816536 947.493024 113.343441 883.474988 113.343441zM933.217902 909.73456c0 25.282826-21.318538 46.644343-46.579875 46.644343L136.978233 956.378903c-25.261337 0-46.579875-21.361517-46.579875-46.644343L90.398358 446.143083 933.217902 446.143083 933.217902 909.73456zM266.948353 645.744074c36.852326 0 66.707284-29.919427 66.707284-66.836221 0-36.897352-29.854958-66.815755-66.707284-66.815755-36.829813 0-66.707284 29.919427-66.707284 66.815755C200.241069 615.824647 230.117516 645.744074 266.948353 645.744074zM511.222799 645.744074c36.830837 0 66.707284-29.919427 66.707284-66.836221 0-36.897352-29.875424-66.815755-66.707284-66.815755-36.852326 0-66.707284 29.919427-66.707284 66.815755C444.515514 615.824647 474.370473 645.744074 511.222799 645.744074zM265.757225 890.1055c36.852326 0 66.706261-29.919427 66.706261-66.815755 0-36.917818-29.853935-66.837244-66.706261-66.837244-36.830837 0-66.707284 29.919427-66.707284 66.837244C199.04994 860.186074 228.925365 890.1055 265.757225 890.1055zM511.222799 890.1055c36.830837 0 66.707284-29.919427 66.707284-66.815755 0-36.917818-29.875424-66.837244-66.707284-66.837244-36.852326 0-66.707284 29.919427-66.707284 66.837244C444.515514 860.186074 474.370473 890.1055 511.222799 890.1055zM755.150344 645.744074c36.83186 0 66.708308-29.919427 66.708308-66.836221 0-36.897352-29.876448-66.815755-66.708308-66.815755-36.852326 0-66.707284 29.919427-66.707284 66.815755C688.444083 615.824647 718.298018 645.744074 755.150344 645.744074zM311.513338 290.500257c24.264637 0 45.345768-19.693528 45.345768-44.002167L356.859106 46.52871c0-24.308639-21.080108-44.023656-45.345768-44.023656-24.285103 0-43.959188 19.715017-43.959188 44.023656l0 199.969381C267.55415 270.806729 287.228235 290.500257 311.513338 290.500257z"
                                    fill="#39C5BB" p-id="6923">
                            </path>
                        </svg>
                        发布于{{ toDayAgo(article.createTime) }}
                    </div>
                    <div class="post-data">
                        <svg viewBox="0 0 1024 1024" width="14" height="14" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="10863" style="vertical-align: -2px;">
                            <path
                                    d="M705.536 328.544c-314.56-271.744-641.056 51.2-641.056 51.2 352-603.84 772.192-160 772.192-160l121.92-115.52v407.104H554.272zM318.912 695.008c314.496 271.648 641.056-51.2 641.056-51.2-352 603.808-772.192 160-772.192 160L64 919.392V548.704h406.208z m0 0"
                                    fill="#0590DF"
                                    p-id="10864">
                            </path>
                        </svg>
                        更新于{{ formatDate(article.updateTime) }}
                    </div>
                </div>
            </el-row>

            <el-row class="counts">
                <el-col :span="24">
                    <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -2px;"
                         xmlns="http://www.w3.org/2000/svg" p-id="10045">
                        <path
                                d="M916.74 865.89h-808.1c-20.71 0-37.47-16.76-37.47-37.47V197.35c0-20.71 16.76-37.47 37.47-37.47h808.1c20.71 0 37.47 16.76 37.47 37.47v631.06c0.01 20.72-16.75 37.48-37.47 37.48z m-770.63-74.95h733.16V234.83H146.11v556.11z"
                                fill="#4181BA" p-id="11235"></path>
                        <path
                                d="M289.45 554.36h-49.62c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h49.62c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z"
                                fill="#2AAAA8" p-id="11236"></path>
                        <path
                                d="M781.38 728.44h-49.66c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h49.66c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z"
                                fill="#4181BA" p-id="11237"></path>
                        <path
                                d="M781.38 554.36H472.71c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47h308.67c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z"
                                fill="#2AAAA8" p-id="11238"></path>
                        <path
                                d="M548.5 728.44H239.83c-20.71 0-37.47-16.76-37.47-37.47 0-20.71 16.76-37.47 37.47-37.47H548.5c20.71 0 37.47 16.76 37.47 37.47 0 20.71-16.76 37.47-37.47 37.47z"
                                fill="#4181BA" p-id="11239"></path>
                    </svg>
                    {{ article.views }} 次围观
                    <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
                        <path
                                d="M510.671749 348.792894S340.102978 48.827055 134.243447 254.685563C-97.636714 486.565724 510.671749 913.435858 510.671749 913.435858s616.107079-419.070494 376.428301-658.749272c-194.095603-194.096626-376.428302 94.106308-376.428301 94.106308z"
                                fill="#FF713C"></path>
                        <path
                                d="M510.666632 929.674705c-3.267417 0-6.534833-0.983397-9.326413-2.950192-16.924461-11.872399-414.71121-293.557896-435.220312-529.448394-5.170766-59.482743 13.879102-111.319341 56.643068-154.075121 51.043536-51.043536 104.911398-76.930113 160.095231-76.930114 112.524796 0 196.878996 106.48115 228.475622 153.195078 33.611515-45.214784 122.406864-148.20646 234.04343-148.20646 53.930283 0 105.46603 24.205285 153.210428 71.941496 45.063335 45.063335 64.954361 99.200326 59.133795 160.920016C935.306982 641.685641 536.758893 915.327952 519.80271 926.859589a16.205077 16.205077 0 0 1-9.136078 2.815116zM282.857183 198.75574c-46.25344 0-92.396363 22.682605-137.127124 67.413365-36.149315 36.157501-51.614541 78.120218-47.25321 128.291898 17.575284 202.089671 352.199481 455.119525 412.332023 499.049037 60.434417-42.86732 395.406538-289.147446 414.567947-492.458945 4.933359-52.344159-11.341303-96.465029-49.759288-134.88199-41.431621-41.423435-85.24243-62.424748-130.242319-62.424748-122.041544 0-220.005716 152.203494-220.989114 153.742547-3.045359 4.806469-8.53335 7.883551-14.101159 7.534603a16.257266 16.257266 0 0 1-13.736863-8.184403c-0.902556-1.587148-91.569532-158.081365-213.690893-158.081364z"
                                fill="#885F44"></path>
                    </svg>
                    666人点赞
                    <span class="sort-label"
                          @click.stop="$router.push({path: `/category/${article.categoryName}`})">
                                <svg viewBox="0 0 1024 1024" width="15" height="15" style="vertical-align: -3px;">
                                  <path
                                          d="M179.2 153.6m89.6 0l588.8 0q89.6 0 89.6 89.6l0 486.4q0 89.6-89.6 89.6l-588.8 0q-89.6 0-89.6-89.6l0-486.4q0-89.6 89.6-89.6Z"
                                          fill="#FF9C55"></path>
                                  <path
                                          d="M25.6 193.4208A91.0208 91.0208 0 0 1 116.6208 102.4H382.592a91.0208 91.0208 0 0 1 87.5008 65.9712l24.5504 85.7216h412.7488A91.0208 91.0208 0 0 1 998.4 345.1392v485.4528A91.0208 91.0208 0 0 1 907.3792 921.6H116.608A91.0208 91.0208 0 0 1 25.6 830.5792V193.408z"
                                          fill="#FFD977"></path>
                                  <path
                                          d="M128 665.6m25.6 0l76.8 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-76.8 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                                          fill="#FFF1C9"></path>
                                  <path
                                          d="M128 768m25.6 0l179.2 0q25.6 0 25.6 25.6l0 0q0 25.6-25.6 25.6l-179.2 0q-25.6 0-25.6-25.6l0 0q0-25.6 25.6-25.6Z"
                                          fill="#FFF1C9"></path>
                                  <path
                                          d="M128 486.4m51.2 0l0 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z"
                                          fill="#FFA86A"></path>
                                </svg> {{ article.categoryName }}
                              </span>
                </el-col>
            </el-row>
        </div>
    </DelayShow>
</template>


<script>
import common from "@/utils/timestampToTime";
import DelayShow from "@/components/DelayShow.vue";

export default {
    name: "ArticleCard",
    components: {DelayShow},
    props: ['article'],
    methods: {
        getTime(createTime) {
            return common.timestampToTime(createTime, 1)
        },
        openArticle(articleId) {
            // 存id，评论指向对应文章id,归为该文章下的评论
            this.$store.commit('article/CHANGE_ARTICLE', articleId)
            sessionStorage.setItem("ArticleId", articleId);
            this.$router.push({
                name: 'ArticleDetail',
                params: {articleId}
                // path:'/articleDetail',
                // query: {articleId}
            })
        },
        toDayAgo(de) {
            const date = new Date(de);
            const now = new Date();
            // 计算两个日期之间的毫秒数差值
            const timeDiff = now.getTime() - date.getTime();
            // 将毫秒数差值转换为天数
            const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            if (daysDiff > 365) {
                const yearDiff = Math.floor(daysDiff / 365);
                return yearDiff + "年前";
            } else {
                return daysDiff + "天前";
            }
        },
        // 格式化日期
        formatDate(date) {
            // 如果要展示多少天前格式
            const de = new Date(date);
            let year = de.getFullYear();
            // 不满足长度2则第一位补0
            let month = (de.getMonth() + 1).toString().padStart(2, '0');
            let day = de.getDate().toString().padStart(2, '0');
            return `${year}年${month}月${day}日`;
        },
    }
}
</script>

<style scoped>


.article-card {
    color: var(--text-color);
    background: var(--bg1);
    border-radius: 20px;
    margin-bottom: 30px;
    height: 350px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
}

.article-card:hover .articleCover .thumbnail-img {
    transform-origin: 50% 50%;
    transform: scale(1.1);
}

.articleCover {
    position: relative;
    overflow: hidden;
    height: 180px;
    width: 100%;
    clip-path: polygon(0 130px, 0 0, 100% 0, 100% 130px, 50% 100%);
    margin-bottom: 20px;
}

.thumbnail-img {
    width: 100%;
    height: 180px;
    transition: transform 0.9s;
}

.article-summary-box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}

.article-summary-content {
    color: white;
    margin: 12% 25px 30px 25px;
    font-size: 14px;
    text-align: center;
}

.article-title {
    padding: 10px;
    text-align: center;
    font-size: 18px;
}

.create-update-time {
    display: flex;
    justify-content: center;
}

.post-data {
    margin: 5px;
    font-size: 12px;
}

.counts {
    margin-top: 10px;
    text-align: center;
    font-size: 16px;
    text-align: center;
}

.sort-label {
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    transition: all 0.3s;
    cursor: pointer;
    user-select: none;
}

.sort-label:hover {
    color: #39C5BBFF;
}


/*以下已经弃用*/
/*.article-title {*/
/*    text-align: center;*/
/*    font-size: 30px;*/
/*    font-weight: bolder;*/
/*    padding: 15px 0;*/
/*    border-bottom: 3px solid black;*/
/*}*/

/*.article-summary {*/
/*    padding: 0 15px;*/
/*    height: 65%;*/
/*    overflow: hidden;*/
/*    margin-top: 20px;*/
/*    max-height: 220px;*/
/*}*/

/*.createTime {*/
/*    position: absolute;*/
/*    bottom: 50px;*/
/*}*/

/*.updateTime {*/
/*    position: absolute;*/
/*    bottom: 20px;*/
/*}*/

/*.category {*/
/*    position: absolute;*/
/*    bottom: 20px;*/
/*    right: 10px;*/
/*}*/
</style>

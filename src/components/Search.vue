<template>
    <div class="right-nav">
        <!-- 搜索框 -->
        <div class="search-box">
            <input type="text" class="search-input" placeholder="搜索什么...">
            <a class="search-btn">
                <i class="fa fa-search"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search"
}
</script>

<style scoped>

/* 右导航总空间 */
.right-nav {
    width: 200px;
    transition: 0.3s;
}

/* 搜索框样式 */
.search-box {
    border-radius: 20px;
    height: 30px;
    float: right;
    overflow: hidden;
    background: #e1dfdf;

}

.search-input {
    float: left;
    width: 0;
    outline: none;
    border: none;
    background: #e1dfdf;
    padding: 2px 0 0 0;
    line-height: 30px;
    transition: 0.3s;
}

.search-btn {
    float: right;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
}

.search-box:hover .search-input {
    float: right;
    width: 150px;
    /* border-radius: 0; */
}

.search-box:hover .search-btn {
    color: #ff004c;
}


</style>

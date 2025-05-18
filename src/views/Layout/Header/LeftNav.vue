<template>
  <div class="left-nav">
    <!-- logo区域 -->
    <div class="nav-title" @click="goHome" style="cursor: pointer;">Zww🍊</div>

  </div>

</template>

<script>

export default {
  name: "Leftnav",
  methods: {
    goHome() {
      if (this.$route.path==='/home') {
        return
      }
   
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>


.left-nav {
}

/* 顶部导航栏左侧的标题 */
.nav-title {
  text-align: center;
  font-size: 25px;
  font-weight: 800;
  white-space: nowrap;
  margin-right: 50px;
}



/*菜单悬浮下面的线*/
/*hover.css样式*/
/*hover.css样式*/
.hvr-underline-from-left {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
}

.hvr-underline-from-left:before {
  content: "";
  position: absolute;
  z-index: -1;
  left: 0;
  right: 100%;
  bottom: 0;
  background: #00b4d8;;
  height: 5px;
  -webkit-transition-property: right;
  transition-property: right;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.hvr-underline-from-left:hover:before, .hvr-underline-from-left:focus:before, .hvr-underline-from-left:active:before {
  right: 0;
}

.hvr-underline-from-left:hover {
  /*color: #2098D1 !important;*/
  -webkit-transition-property: right;
  transition-property: right;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

/*下拉箭头icon*/
.drop-img {
  height: 15px !important;
  width: 15px !important;
  margin-left: 5px;
  transform: rotate(180deg);
}

/*下拉箭头悬浮时旋转*/
.menu:hover .drop-img {
  transform: rotate(0deg);
  transition: transform 0.4s;
}

/*下拉菜单整体*/
.menu .nav-drop-down-wrapper {
  position: absolute;
  top: 64px;
  left: 0;
  /*display: none;*/
  opacity: 0;
  transition: 0.4s;
}

/*下拉菜单body*/
.nav-drop-down {
  background: white;
  color: black;
  min-width: 113px;
  font-weight: bold;
  font-size: 14px;
}

/*下拉菜单每个item*/
.down-item-wrapper {
  padding: 15px 10px;
  text-align: center;
}

/*下拉菜单每个item*/
.down-item-wrapper:hover {
  color: white;
  background: #39c5bb;
}

/*当鼠标悬浮式下拉菜单显示*/
.nav-drop-down-wrapper {
  display: none;
  opacity: 0;
}

.menu:hover .nav-drop-down-wrapper {
  display: block;
  opacity: 1;
}


.menu i {
  margin-right: 5px;
}

.menu-svg-img {
  margin-right: 10px;
  width: 21px;
  height: 21px;
}


/*.dropdown-menu {*/
/*    border: none;*/
/*}*/

/*.articleHover:hover ~ .dropdown-menu {*/
/*    display: block;*/
/*    border: none;*/
/*}*/

/*.dropdown-menu:before {*/
/*    content: '';*/
/*    position: absolute;*/
/*    border-top: 10px solid transparent;*/
/*    border-bottom: 10px solid #ffffff;*/
/*    border-left: 10px solid transparent;*/
/*    border-right: 10px solid transparent;*/
/*    top: -19px;*/
/*    left: 19px;*/
/*}*/

/*.dropdown-menu:hover {*/
/*    display: block;*/
/*}*/
</style>

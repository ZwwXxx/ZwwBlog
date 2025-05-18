<template>
  <div ref="affixFather" :style="wrapStyle">
    <div :class="{'fixed':affixed}" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    offsetTop: {
      type: Number,
      default: 0,
    },
    onAffix: {
      type: Function,
      default() {},
    },
    boundary: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      affixed: false,
      styles: {},
      affixedClientHeight: 0,
      fatherWidth: "",
      fatherDomOffsetTop:'',
      boundaryOffsetTop:'',
      wrapStyle:{}
    };
  },
  methods: {
    // 传入window元素，和top布尔，T为获取垂直滚动距离，F水平
    // 说白了就是拿来获取横向或纵向滚动距离的
    getScroll(w, top) {
      // 获取元素对比window的距离。
      // 获取w[pageYOffset]的值，
      // 如果不存在,也就是ret类型不为number，则获取根document（整个文档）的documentEl..（Html标签）
      // 的垂直或水平偏移document.documentElement.scrollTop
      // 如果还是不存在，则获取body的scrollTop
      let ret = w[`page${top ? "Y" : "X"}Offset`];
      const method = `scroll${top ? "Top" : "Left"}`;
      if (typeof ret !== "number") {
        const d = w.document;
        // ie6,7,8 standard mode
        ret = d.documentElement[method];
        if (typeof ret !== "number") {
          // quirks mode
          ret = d.body[method];
        }
      }
      return ret;
    },
    getOffset(element) {
      // 获取元素相对于视窗的距离，top/left起点为左上角right/bottom为右下角rect.top/left...
      const rect = element.getBoundingClientRect();
      const body = document.body;
      // 获取顶部边框宽度，后续减掉，因为滚动距离是以没边框的el计算的
      //
      const clientTop = element.clientTop || body.clientTop || 0;
      const clientLeft = element.clientLeft || body.clientLeft || 0;
      // const clientHeight = element.clientHeight || 0;
      const scrollTop = this.getScroll(window, true);
      const scrollLeft = this.getScroll(window);
      return {
        top: rect.bottom + scrollTop - clientTop - this.affixedClientHeight,
        left: rect.left + scrollLeft - clientLeft,
        bottom: rect.top,
      };
    },
    handleScroll() {
      var _that = this;
      const elementOffset = _that.getOffset(this.$el);// 获取当前元素距离视窗的距离
      const elOffsetTop = _that.$el.getBoundingClientRect().top; // 当前元素至视窗顶部距离
      let isAffixTop = _that.fatherDomOffsetTop + _that.offsetTop; // 需要固钉的距离(外部传递)
      // 获取动态视窗距离 ，若没绑定特殊节点
      if (!_that.boundary) {
        if (!_that.affixed && elOffsetTop < isAffixTop) {
          // 当滚动条移动使元素要离开视窗时，固钉状态生效
          _that.affixed = true;
          _that.styles = {
            // 设置top距离等于初始距离加上传入offset距离
            top: `${isAffixTop}px`,
            left: `${elementOffset.left}px`,
            width: `${_that.$el.clientWidth}px`,
            zIndex: 1,
          };
          // 固钉事件触发传递
          _that.onAffix(_that.affixed);
        }else if(_that.affixed && elOffsetTop > isAffixTop){
          // 滚动条返回最初距离时 固钉状态取消，若不取消则元素会一直保持在顶部不会返回初始位置
          _that.affixed = false
          _that.styles = {}
          _that.onAffix(_that.affixed);
        }
      } else if (_that.boundary) {
        // 绑定指定父节点，则高度使用父节点的初始高度
        const boundaryOffsetTop = _that.boundaryOffsetTop + _that.offsetTop
        if (!_that.affixed && elOffsetTop < _that.boundaryOffsetTop) {
          // 若绑定特殊固钉节点
          _that.affixed = true;
          _that.styles = {
            top: `${boundaryOffsetTop}px`,
            left: `${elementOffset.left}px`,
            width: `${_that.$el.clientWidth}px`,
            zIndex: 1,
          };
          // 固钉事件触发传递
          _that.onAffix(_that.affixed);
        }else if (_that.affixed && elOffsetTop > _that.boundaryOffsetTop){
          _that.affixed = false
          _that.styles = {}
          // 固钉事件触发传递
          _that.onAffix(_that.affixed);
        }
      }
    },
    getWidth() {
      this.fatherWidth = `${this.$refs.affixFather.clientWidth}px`;
    },
  },
  computed: {
    offsets() {
      if (this.boundary) {
        return 0;
      }
      return this.offsetTop;
    },
  },
  mounted() {
    this.getWidth();
    // 获取dom节点的子元素也就是插槽那个盒子，也就是外部传进来要固钉的div，获取其总高度。包括了内边距
    this.affixedClientHeight = this.$el.children[0].clientHeight;
    // 挂载时获取自身节点至视窗顶部高度
    this.fatherDomOffsetTop = 0;
    if(this.boundary){
      // 若有指定父节点则获取父节点至视窗顶部高度
      this.boundaryOffsetTop = document.getElementById(this.boundary).getBoundingClientRect().top;
    }
    window.addEventListener("scroll", this.handleScroll, true); // 监听滚动条
    window.addEventListener("resize", this.handleScroll, true);
    window.onresize = () => {
      // 监听浏览器视窗大小
      return (() => {
        // 获取动态宽度自适应
        this.getWidth();
      })();
    };
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleScroll);
  },
};
</script>
<style >
.fixed {
  position: fixed;
}
</style>

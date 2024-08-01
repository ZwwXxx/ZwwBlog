<template>
  <!--组件的结构-->
    <div class=" animate__zoomIn">
        <slot></slot>
    </div>
</template>
<script>
//组件交互相关的代码(数据、方法等等)
export default {
  name: 'DelayShow',
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style>


.animate__zoomIn {
    animation-name: zoomIn;
    animation-duration: 3s;
    animation-delay: 200ms;
    animation-iteration-count: 1;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.2);
    }

    50% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>

<template>
    <div class="banner">
        <div class="banner-title">
            <span>Zww</span>
        </div>
        <div class="banner-subtitle">
            Man proposes,God disposes
        </div>
        <a class="arrow" @click="scrollTo()"></a>
    </div>
</template>

<script>
export default {
    name: "Banner",
    methods: {
        scrollTo() {
            const container = document.getElementById("container")
            container.scrollIntoView({
                block: "start",
                behavior: "smooth"
            })
        }
    }
}
</script>

<style scoped>
/* banner区域 */
.banner {
    height: 100vh;
    position: relative;
    overflow: hidden;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}

.banner-title {
    font-size: 66px;
    font-weight: bolder;
    margin-bottom: 20px;
    text-shadow: 0 0px 5px #fffb00;
    /* box-shadow: 0 0 8px #fffb00; */
    /* color: transparent; */
}

.banner-subtitle {
    background: linear-gradient(to right, rgb(255, 196, 0), rgb(99, 255, 169));
    -webkit-background-clip: text;
    box-sizing: border-box;
    color: transparent;
    white-space: nowrap;
    font-weight: bold;
    overflow: hidden;
    font-size: 35px;
    width: 0;
    border-right: 2px solid transparent;
    animation: grow 2s steps(20) 1 0.5s normal both, blink 500ms 8 steps(44) both;
    text-shadow: 0 0px 4px #00ffbb;
}

@keyframes grow {
    0% {
        width: 0;
    }
    100% {
        width: 420px;
    }

    /* 40%,
    60% {
      width: 225px;
    }
    100% {
      width: 0;
    } */
}

@keyframes blink {
    from {
        border-right-color: #eee;
    }
    to {
        border-right-color: transparent;
    }
}

.arrow {
    display: block;
    position: absolute;
    width: 40px;
    height: 50px;
    cursor: pointer;
    bottom: 10px;
}

.arrow::before {
    content: '';
    position: absolute;
    bottom: 15px;
    left: 50%;
    width: 14px;
    height: 14px;
    border-bottom: 5px solid #fff;
    border-right: 5px solid #fff;
    opacity: 0.9;
    transform: translateX(-50%) rotate(45deg);
}

</style>

<template>
       <div class="banner"  v-show="this.$route.path==='/home'">
           <div class="banner-title">
               <span>Zww</span>
           </div>
           <div class="banner-subtitle">
               Man proposes,God disposes
           </div>
           <a class="arrow" @click="scrollTo()" v-show="this.$route.path==='/home'"></a>
           <section>
               <div class="wave wave1 "></div>
               <div class="wave wave2 "></div>
               <div class="wave wave3 "></div>
               <div class="wave wave4"></div>
           </section>
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
                // behavior: "smooth"
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
    background: linear-gradient(to right bottom, #c7be98, #ccb1bb, #9fbbbe, #96af7b);
    background-size: 400% 400%;
    animation: gradientAnimation 30s ease infinite;
}
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
.banner-title {
    font-size: 66px;
    font-weight: bolder;
    margin-bottom: 20px;
    /* box-shadow: 0 0 8px #fffb00; */
    /* color: transparent; */
}

.banner-subtitle {
    /*background: linear-gradient(to right, rgb(255, 196, 0), rgb(99, 255, 169));*/
    /*-webkit-background-clip: text;*/
    box-sizing: border-box;
    /*color: transparent;*/
    white-space: nowrap;
    font-weight: bold;
    overflow: hidden;
    font-size: 35px;
    width: 0;
    border-right: 2px solid transparent;
    animation: grow 2s steps(30) 1 0.5s normal both, blink 500ms 8 steps(44) both;
    /*text-shadow: 0 0px 4px #00ffbb;*/
}

@keyframes grow {
    0% {
        width: 0;
    }
    100% {
        width: 465px;
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
    border-bottom: 5px solid #313131;
    border-right: 5px solid #131313;
    opacity: 0.9;
    transform: translateX(-50%) rotate(45deg);
    z-index: 1001;
    color: black;
}

section {
    position: absolute;
    width: 100%;
    height: 50vh;
    overflow: hidden;
    bottom: 0;
}

section .wave {
    width: 100%;
    height: 100px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("@/assets/images/wave.png");
    background-size: 1000px 100px;
}

section .wave.wave1 {
    animation: animate1 13s linear infinite;
    z-index: 1000;
    opacity: 1;
    animation-delay: 0s;
    bottom: 0;
}

section .wave.wave2 {
    animation: animate2 11s linear infinite;
    z-index: 999;
    opacity: 0.6;
    animation-delay: -3s;
    bottom: 30px;
}

section .wave.wave3 {
    animation: animate1 7s linear infinite;
    z-index: 998;
    opacity: 0.4;
    animation-delay: -6s;
    bottom: 25px;
}

section .wave.wave4 {
    animation: animate2 5s linear infinite;
    z-index: 997;
    opacity: 0.71;
    animation-delay: -8s;
    bottom: 30px;
}

@keyframes animate1 {
    0% {
        background-position-x: 0;
    }

    100% {
        background-position-x: 1000px;
    }
}

@keyframes animate2 {
    0% {
        background-position-x: 0;
    }

    100% {
        background-position-x: -1000px;
    }
}

</style>

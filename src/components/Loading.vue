<template>
    <div class="modal">
        <div class="loading">
            <div class="item1"></div>
            <div class="item2"></div>
            <div class="item3"></div>
            <div class="item4"></div>
            <div class="item5"></div>
            <div class="item6"></div>
            <div class="item7"></div>
            <div class="item8"></div>
            <div class="item9"></div>
            <div class="item10"></div>
            <div class="item11"></div>
            <div class="item12"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loading"
}
</script>

<style scoped>
.modal {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #5b5b5b;
    border-radius: 20px;
}

.loading div {
    position: absolute;
    width: 5px;
    height: 20px;
    background-color: orange;
    border-radius: 10px;
    animation: loading 1.2s linear infinite;
    box-shadow: 0 0 20px #fffa00;
}

@keyframes loading {
    from {
        opacity: 1;
    }
    to{
        opacity: 0.15;
    }
}

.loading .item1 {
    transform: rotate(0deg) translate(0, 120%);
    animation-delay: -1.2s;
}

.loading .item2 {
    transform: rotate(30deg) translate(0, 120%);
    animation-delay: -1.1s;
}

.loading .item3 {
    transform: rotate(60deg) translate(0, 120%);
    animation-delay: -1s;
}

.loading .item4 {
    transform: rotate(90deg) translate(0, 120%);
    animation-delay: -0.9s;
}

.loading .item5 {
    transform: rotate(120deg) translate(0, 120%);
    animation-delay: -0.8s;
}

.loading .item6 {
    transform: rotate(150deg) translate(0, 120%);
    animation-delay: -0.7s;
}

.loading .item7 {
    transform: rotate(180deg) translate(0, 120%);
    animation-delay: -0.6s;
}

.loading .item8 {
    transform: rotate(210deg) translate(0, 120%);
    animation-delay: -0.5s;
}

.loading .item9 {
    transform: rotate(240deg) translate(0, 120%);
    animation-delay: -0.4s;
}

.loading .item10 {
    transform: rotate(270deg) translate(0, 120%);
    animation-delay: -0.3s;
}

.loading .item11 {
    transform: rotate(300deg) translate(0, 120%);
    animation-delay: -0.2s;
}

.loading .item12 {
    transform: rotate(330deg) translate(0, 120%);
    animation-delay: -0.1s;
}
</style>

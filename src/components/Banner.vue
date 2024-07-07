<template>
   <div>
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
    methods:{
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

</style>

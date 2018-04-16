<template>
    <span class="icon-rocket" id="top" @click="top"></span>
</template>

<script>
    export default {
        name: "top",
        methods:{
            top(){
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                let scrollOnce = scrollTop/50;
                setInterval(function () {
                    if(scrollTop>0){
                        document.documentElement.scrollTop = scrollTop -=scrollOnce;
                    }
                },10);
            },
        },
    }
</script>

<style scoped lang="less">
    #top{
        position: fixed;
        right: 5%;
        bottom: 5%;
        font-size: 2rem;
        cursor: pointer;
        transform: rotate(-0.8rad);
    }
</style>
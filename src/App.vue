<template>
    <div id="app">
        <navbar-component></navbar-component>
        <router-view/>
    </div>
</template>

<script>
    import adapt from './assets/js/adapt';//引入自适应js
    export default {
        name: 'app',
        mounted(){
            adapt();
            this.titleChange();
        },
        methods:{
            titleChange(){
                window.addEventListener("focus",function () {
                    document.querySelector("title").innerHTML = "欢迎回来（●＾∀＾●）";
                    setTimeout(function () {
                        document.querySelector("title").innerHTML = "诗酒剑歌  (..•˘_˘•..)";
                    },1000)
                });
                window.addEventListener("blur",function () {
                    document.querySelector("title").innerHTML = "来找我呀！=￣ω￣= ";
                });
            },
        },
    }
</script>

<style>
    @import "./assets/css/reset.css";
    #app {
        position: absolute;
        width: 100rem;
        background-color: #f6f6f6;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

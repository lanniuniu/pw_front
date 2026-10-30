<template>
    <div id="app">
        <navbar-component></navbar-component>
        <nuxt/>
        <div id="cover"></div>
    </div>
</template>

<script>
import adapt from '~/assets/js/adapt';
export default {
    name: 'default-layout',
    mounted() {
        adapt();
        this.titleChange();
        this.mode();
    },
    methods: {
        //title变换
        titleChange() {
            window.addEventListener("focus", function () {
                document.querySelector("title").innerHTML = "欢迎回来（●＾∀＾●）";
                setTimeout(function () {
                    if (document.hasFocus()) {
                        document.querySelector("title").innerHTML = "诗酒剑歌  (..•˘_˘•..)";
                    } else {
                        document.querySelector("title").innerHTML = "来找我呀！=￣ω￣= ";
                    }
                }, 1000)
            });
            window.addEventListener("blur", function () {
                document.querySelector("title").innerHTML = "来找我呀！=￣ω￣= ";
            });
        },
        // 日夜间模式
        mode() {
            if (sessionStorage.getItem("mode")) {
                document.querySelector("#cover").style.display = sessionStorage.getItem("mode") === 'night' ? 'block' : 'none';
            } else {
                document.querySelector("#cover").style.display = 'none';
            }
        }
    },
}
</script>

<style>
    #app {
        position: absolute;
        width: 100%;
        background-color: #f6f6f6;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #cover {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10000;
        outline: 1000rem solid rgba(0,0,0,0.4);
    }
</style>

<template>
    <div :class="backgroundProp" class="newsTips">{{msgProp}}</div>
</template>

<script>
    export default {
        name: "news-tips",
        data(){
            return{

            }
        },
        props:{
            msgProp:{
                type: String,
                required: true
            },
            backgroundProp: {
                type: String,
                required: true
            }
        },
        mounted(){
            document.querySelector(".newsTips").style.backgroundColor = this.backgroundProp;
        },
        methods:{

        }
    }
</script>

<style scoped lang="less">
    div{
        display: none;
        padding: 0 3rem;
        opacity: 1;
        line-height: 3rem;
        font-size: 1.2rem;
        color: #fff;
        border-radius: 0.5rem;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .error{
        background-color: #dc3545;
    }
    .success{
        background-color: #218838
    }
</style>
<template>
    <div class="target">
        <slot>

        </slot>
        <!--<div class="tooltipsDiv">-->

        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: "tooltips",
        data(){
            return{
                position: '',
                title: '',
            }
        },
        mounted(){
            // this.preparing();
        },
        methods:{
            preparing(){
                //判断方向 确定位置

            }
        },
    }
</script>

<style scoped lang="less">
    .target{
        display: inline-block;
        width: 3.5rem !important;
        height: 3rem;
        float: left;
        .tooltipsDiv{
            background-color: #563d7c;
            border-radius: 0.5rem;
            padding: 0.3rem 0.2rem;
            text-align: center;
            color: #cbbde2;
        }
        .tooltipsDiv:after{
            content: '';
            display: inline-block;
            width: 0;
            height: 0;
            position: absolute;
            /*left: -1rem;*/
            /*top: 5rem;*/
            border-bottom: 1rem solid #563d7c;
            border-right: 1rem solid transparent;
            transform: rotate(45deg);
        }

    }
</style>
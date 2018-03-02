<template>
    <div class="target">
        <slot>

        </slot>
        <div class="tooltipsDiv">

        </div>
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
            this.preparing();
        },
        methods:{
            preparing(){
                //判断方向和title内容,将title内容添加到div中
                let element = document.querySelector(".tooltips");
                let title = element.getAttribute('title');
                let elementClass =  element.getAttribute('class');
                let classes = elementClass.split(' ');
                let positionClass;
                classes.map((value)=>{
                    if(value.indexOf('tooltips-')!==-1){
                        positionClass = value;
                    }
                    return false;
                });
                this.position = positionClass.split('-')[1];
                document.querySelector(".target .tooltipsDiv").innerHTML = title;
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
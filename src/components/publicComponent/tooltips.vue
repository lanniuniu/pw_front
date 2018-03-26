<template>
    <div class="tooltipsParent">
        <div class="slot">
            <slot>

            </slot>
        </div>
        <!--<div class="triangle" v-if="isShowLeft">123</div>-->
        <!--<div class="triangle" v-if="isShowRight">123</div>-->
        <div class="triangle"></div>
        <!--<div class="triangle" v-if="isShowBottom">123</div>-->
    </div>
</template>

<script>
    export default {
        name: "tooltips",
        data() {
            return {
                position: '',
            }
        },
        computed: {
            isShowLeft() {
            },
            isShowRight() {
            },
            isShowTop() {
                // return this.position === 'bottom';
            },
            isShowBottom() {
            },
        },
        mounted() {
            this.preparing();
        },
        methods: {
            preparing() {
                //判断方向 确定位置
                let tooltips = document.querySelectorAll(".tooltips");//所有tooltips
                let tooltipsParent = document.querySelector(".tooltipsParent");//tooltips最外层div
                let tooltipsTriangle = document.querySelector(".tooltipsParent .triangle");
                for (let i = 0; i < tooltips.length; i++) {
                    //tooltips鼠标悬停事件
                    tooltips[i].addEventListener("mouseover", function (event) {
                        //提示框的位置
                        let offsetHeight = event.target.offsetHeight;
                        let offsetLeft = event.target.offsetLeft;
                        tooltipsParent.style.display = 'block';
                        tooltipsParent.style.left = offsetLeft + 'px';
                        tooltipsParent.style.top = (offsetHeight / 2) + 'px';

                        //小三角的位置
                        let tooltipsParentClientWidth = tooltipsParent.clientWidth;
                        tooltipsTriangle.style.left = tooltipsParentClientWidth / 3 * 2 + "px";
                    });
                    //tooltips鼠标离开事件
                    tooltips[i].addEventListener("mouseout", function (event) {
                        if (!((event.toElement && event.toElement.className === "tooltipsParent") || (event.toElement && event.toElement.className === "triangle"))) {
                            tooltipsParent.style.display = 'none';
                        }
                    });

                    // // tooltipsParent鼠标离开事件
                    tooltipsParent.addEventListener("mouseout", function (event) {
                        let isLeave = true;
                        if (event.toElement && event.toElement.className && event.toElement.className === 'tooltipsParent') {
                            isLeave = false;
                        } else {
                            if (event.toElement && event.toElement.parentElement && event.toElement.parentElement.className && event.toElement.parentElement.className === 'tooltipsParent') {
                                isLeave = false;
                            } else {
                                if (event.toElement && event.toElement.parentElement && event.toElement.parentElement.parentElement && event.toElement.parentElement.parentElement.className && event.toElement.parentElement.parentElement.className === 'tooltipsParent') {
                                    isLeave = false;
                                } else {
                                    if (event.toElement && event.toElement.parentElement && event.toElement.parentElement.parentElement && event.toElement.parentElement.parentElement.parentElement && event.toElement.parentElement.parentElement.parentElement.className && event.toElement.parentElement.parentElement.parentElement.className === 'tooltipsParent') {
                                        isLeave = false;
                                    } else {
                                        if (event.toElement && event.toElement.parentElement && event.toElement.parentElement.parentElement && event.toElement.parentElement.parentElement.parentElement && event.toElement.parentElement.parentElement.parentElement.parentElement && event.toElement.parentElement.parentElement.parentElement.parentElement.className && event.toElement.parentElement.parentElement.parentElement.parentElement.className === 'tooltipsParent') {
                                            isLeave = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (isLeave) {
                            tooltipsParent.style.display = 'none';
                        }
                    });

                }
            },
        },
    }
</script>

<style scoped lang="less">
    .tooltipsParent {
        display: none;
        position: absolute;
        z-index: 1001;
        transform: translateX(-50%) translateY(2rem);

        .slot {
            padding: 0.5rem 0.8rem;
            border: 1px solid rgba(0, 0, 0, .2);
            background-color: #fefefe;
            border-radius: 0.5rem;
            box-sizing: border-box;
            margin-top: 0.5rem;
            color: #818182;
            /*transform: translateY(-0.5rem);*/
        }
        .triangle {
            width: 1rem;
            height: 0.5rem;
            position: absolute;
            display: block;
            background-color: transparent;
            top: 0;
        }
        .triangle::before, .triangle::after {
            box-sizing: border-box;
            position: absolute;
            display: block;
            content: "";
            border-color: transparent;
            border-style: solid;
            border-top-width: 0;
            border-right-width: 0.5rem;
            border-bottom-width: 0.5rem;
            border-left-width: 0.5rem;
        }
        .triangle::before {
            border-bottom-color: rgba(0, 0, 0, .25);
            bottom: 0;
        }
        .triangle::after {
            border-bottom-color: white;
            top: 1px;
        }
    }
</style>
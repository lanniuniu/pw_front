<template>
    <div id="rightMixed">
        <section id="person">
            <div id="love">
                <img src="../../static/img/dai-HD.jpg" alt="呆宝宝">
            </div>
            <div id="mine">
                <img src="../../static/img/cat.png" alt="懒牛牛">
                <div>
                    <h1>懒牛牛</h1>
                    <h4>一篇诗，一斗酒，一曲长歌，一剑天涯</h4>
                    <h3>
                        <span title="QQ"><a class="icon-qq"></a></span>
                        <span title="点击加入QQ群"><a class="icon-users"></a></span>
                        <span title="邮箱" @click="jumpPage"><a target="_blank" href="mailto:1129638103@qq.com" class="icon-mail-alt"></a></span>
                        <span title="Github" @click="jumpPage"><a target="_blank" href="https://github.com/lanniuniu" class="icon-github-circled"></a></span>
                        <span title="微博" @click="jumpPage"><a target="_blank" href="https://weibo.com/u/1948482917" class="icon-weibo"></a></span>
                        <span title="日/夜间模式" @click="changeModes"><a class="icon-moon"></a></span>
                    </h3>
                </div>
            </div>
        </section>
        <section id="music"></section>
        <section id="statistics"></section>
    </div>
</template>

<script>
    export default {
        name: "right-mixed",
        methods:{
            //跳转到子节点所对应链接
            jumpPage(event){
                event.currentTarget.firstChild.click();
            },
            //改变日夜间模式
            changeModes(event){
                let target = event.currentTarget.firstChild;
                if(target.getAttribute('class') === 'icon-moon'){
                    // 改变为夜间模式
                    target.setAttribute('class','icon-sun');
                    document.querySelector("#cover").style.display = "block"
                }else {
                    //改变为日间模式
                    target.setAttribute('class','icon-moon');
                    document.querySelector("#cover").style.display = "none"
                }
            },
        },
    }
</script>

<style lang="less">
    #rightMixed{
        width: 28.5rem;
        float: right;
        padding: 1rem;
        background-color: #fff;
        border-radius: 0.5rem;

        #person{
            #love {
                /*img:nth-child(1){*/
                    /*width: 8rem;*/
                    /*border-radius: 1rem;*/
                    /*margin-left: 2rem;*/
                    /*display: inline-block;*/
                    /*float: left;*/
                /*}*/
                text-align: center;
                img:nth-child(1){
                    width: 28rem;
                    display: inline-block;
                    border-radius: 0.5rem;
                }
            }
            #mine{
                text-align: center;
                position: relative;
                height: 12rem;
                img{
                    display: inline-block;
                    width: 12rem;
                    border-radius: 6rem;
                    border: 2px solid #f6f6f6;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-106%);
                    transition: border 0.2s ease-in-out,box-shadow 0.2s ease-in-out;
                }
                img:hover{
                    box-shadow: 0 0 0 3px rgba(121,82,179,.25);
                    border:  2px solid #7952b3;
                    cursor: pointer;
                }
                div{
                    position: absolute;
                    width: 100%;
                    top: 5.3rem;
                    left: 50%;
                    transform: translate(-50%,0);
                    h4{
                        font-weight: normal;
                        margin-top: 0.1rem;
                    }
                    h3{
                        margin-top: 0.2rem;
                        span{
                            display: inline-block;
                            width: 3rem;
                            height: 3rem;
                            background: #563d7c;
                            line-height: 3rem;
                            border-radius: 1.5rem;
                            margin-left: 0.5rem;
                            transition: box-shadow 0.2s ease-in-out;

                            a{
                                color: #cbbde2;
                            }
                        }
                        span:hover{
                            cursor: pointer;
                            box-shadow: 0 0 0 2px #ffe484;
                        }
                        span:hover a{
                            transition: color 0.2s ease-in-out;
                            color: #ffe484;
                            cursor: pointer;
                        }
                    }
                }
            }
        }


    }
</style>
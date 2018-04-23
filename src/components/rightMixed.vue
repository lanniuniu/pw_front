<template>
    <div id="rightMixed">
        <section id="person">
            <div id="love">
                <img :src="dai" alt="呆宝宝">
            </div>
            <div id="mine">
                <img :src="cat" alt="懒牛牛" @click="turnToAbout">
                <div>
                    <h1>懒牛牛</h1>
                    <h4>一篇诗，一斗酒，一曲长歌，一剑天涯</h4>
                    <h3>
                        <span title="点击加我QQ（来者注明原因）"><a class="icon-pw-qq" @click="addQQ"></a></span>
                        <span title="点击加入QQ群（来者注明原因）"><a class="icon-pw-users" target="_blank"
                                                         href="https://jq.qq.com/?_wv=1027&k=5g8X2Ap"></a></span>
                        <span title="邮箱"><a target="_blank" href="mailto:1129638103@qq.com"
                                            class="icon-pw-mail-alt"></a></span>
                        <span title="Github"><a target="_blank" href="https://github.com/lanniuniu"
                                                class="icon-pw-github-circled"></a></span>
                        <span title="微博"><a target="_blank" href="http://weibo.com/shijiujiange"
                                            class="icon-pw-weibo"></a></span>
                        <span title="日/夜间模式" @click="changeModes"><a :class="modeIcon"></a></span>
                    </h3>
                </div>
            </div>
        </section>
        <section id="music"></section>
        <section id="statistics"></section>
    </div>
</template>

<script>
    import cat from '../assets/img/cat.jpg'
    import dai from '../assets/img/dai.jpg'

    export default {
        name: "right-mixed",
        data() {
            return {
                cat: cat,
                dai: dai
            }
        },
        computed: {
            modeIcon() {
                let mode = sessionStorage.getItem('mode');
                if (mode) {
                    return mode === 'night' ? 'icon-pw-sun' : 'icon-pw-moon';
                } else {
                    return 'icon-pw-moon'
                }
            },
        },
        methods: {
            //跳转关于界面
            turnToAbout(){
                this.$router.push('/blog/detail/_id=5add4b557846872da47b98f6')
            },

            //改变日夜间模式
            changeModes(event) {
                let target = event.currentTarget.firstChild;
                if (target.getAttribute('class') === 'icon-pw-moon') {
                    // 改变为夜间模式
                    sessionStorage.setItem('mode', 'night');
                    target.setAttribute('class', 'icon-pw-sun');
                    document.querySelector("#cover").style.display = "block"
                } else {
                    //改变为日间模式
                    target.setAttribute('class', 'icon-pw-moon');
                    sessionStorage.setItem('mode', 'day');
                    document.querySelector("#cover").style.display = "none"
                }
            },
            //添加qq
            addQQ() {
                window.location.href = 'tencent://message/?uin=1129638103&Site=诗酒剑歌&Menu=yes'
            },
        },
    }
</script>

<style lang="less">
    #rightMixed {
        width: 28.5rem;
        float: right;
        padding: 1rem;
        background-color: #fff;
        border-radius: 0.5rem;

        #person {
            #love {
                /*img:nth-child(1){*/
                /*width: 8rem;*/
                /*border-radius: 1rem;*/
                /*margin-left: 2rem;*/
                /*display: inline-block;*/
                /*float: left;*/
                /*}*/
                text-align: center;
                img:nth-child(1) {
                    width: 28rem;
                    display: inline-block;
                    border-radius: 0.5rem;
                }
            }
            #mine {
                text-align: center;
                position: relative;
                height: 12rem;
                img {
                    display: inline-block;
                    width: 12rem;
                    border-radius: 6rem;
                    border: 2px solid #f6f6f6;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -106%);
                    transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
                    animation: rotate 10s linear infinite;
                    animation-play-state: running;

                }
                @keyframes rotate {
                    from {
                        transform: translate(-50%, -106%) rotate(0);
                    }
                    to {
                        transform: translate(-50%, -106%) rotate(1turn);
                    }
                }
                img:hover {
                    box-shadow: 0 0 0 3px rgba(121, 82, 179, .25);
                    border: 2px solid #7952b3;
                    cursor: pointer;
                    animation-play-state: paused;
                }
                div {
                    position: absolute;
                    width: 100%;
                    top: 5.3rem;
                    left: 50%;
                    transform: translate(-50%, 0);
                    h4 {
                        font-weight: normal;
                        margin-top: 0.1rem;
                    }
                    h3 {
                        margin-top: 0.2rem;
                        span {
                            display: inline-block;
                            width: 3rem;
                            height: 3rem;
                            background: #563d7c;
                            line-height: 3rem;
                            border-radius: 1.5rem;
                            margin-left: 0.5rem;
                            transition: box-shadow 0.2s ease-in-out;

                            a {
                                color: #cbbde2;
                            }
                        }
                        span:hover {
                            cursor: pointer;
                            box-shadow: 0 0 0 2px #ffe484;
                        }
                        span:hover a {
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
<template>
    <nav id="nav">
        <a href="/" class="brand">诗酒剑歌</a>

        <!--功能菜单 start-->
        <div class="nav-list">
            <ul>
                <li class="nav-item">
                    <a class="nav-link" href="/#/"> <span class="icon-pw-home"></span>Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/#/blog/list"><span class="icon-pw-doc"></span>Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" @click="toDo"><span class="icon-pw-headphones"></span>Music</a>
                </li>
                <li class="nav-item">
                    <a @click="toDo">
                        <span class="icon-pw-gamepad"></span>Game
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/#/about">
                        <span class="icon-pw-info-circled"></span>About me
                    </a>
                </li>

            </ul>
        </div>
        <!--功能菜单 end-->

        <div class="nav-behavior">
            <!--todo-->
            <!--<label for="search"><span class="icon-pw-search" title="搜索" @click="UISearch" id="searchBtn"></span>-->
            <!--<input type="search" id="search" placeholder="Search">-->
            <!--</label>-->
            <label for="search"><span class="icon-pw-search" title="搜索" @click="toDo" id="searchBtn"></span>
                <input type="search" id="search" placeholder="Search">
            </label>
            <span v-if="isLogin" class="icon-pw-login" title="登录" @click="openLoginModal"></span>
            <modal-component id="loginModal"></modal-component>
            <div id="welcome" :class="isWelcome">welcome,&nbsp;<span id="name" class="tooltips" data-tooltips="tooltips"
                                                                     data-position="bottom">{{loginUsername}}</span>
            </div>
        </div>
        <news-tips-component id="navNewsTips" :backgroundProp="newsTips.background"
                             :msgProp="newsTips.msg"></news-tips-component>
        <tooltips-component id="user">
            <div id="userInfo">
                <badge-component class="badge badge-info">用户信息</badge-component>
                <h5 id="lastLoginAddress">上次登录地点: &nbsp;<badge-component class="badge badge-info">
                    {{tooltips.lastLoginAddress}}
                </badge-component>
                </h5>
                <h5 id="lastLoginDate">上次登录时间: &nbsp;<badge-component class="badge badge-info">
                    {{tooltips.lastLoginDate}}
                </badge-component>
                </h5>
                <h5 id="lastLoginIp">上次登录 &nbsp;I P : &nbsp;<badge-component class="badge badge-info">
                    {{tooltips.lastLoginIp}}
                </badge-component>
                </h5>
            </div>
            <div id="userOperating">
                <badge-component class="badge badge-primary">用户操作</badge-component>
                <div v-if="isAdmin">
                    <button-component class="btn btn-primary" @click.native="locationToBlog">添加blog</button-component>
                    <button-component class="btn btn-danger">异常处理</button-component>
                </div>
                <button-component class="btn btn-warning" @click.native="logout">注销</button-component>
            </div>
        </tooltips-component>
    </nav>
</template>
<script>
    const CryptoJS = require("crypto-js");
    export default {
        data() {
            return {
                newsTips: {//消息提示
                    background: '',//背景色
                    msg: '',//消息内容
                },
                tooltips: {//工具提示
                    lastLoginAddress: '',
                    lastLoginDate: '',
                    lastLoginIp: '',
                },
                isAdmin: false,
            }
        },
        mounted() {
            this.enterLogin();
            this.clickLogin();
            this.autoLoadData();
        },
        computed: {
            //是否登录
            isLogin() {
                return !sessionStorage.getItem("user");
            },
            //登录的用户名
            loginUsername() {
                let user = sessionStorage.getItem("user");
                if (user) {
                    return JSON.parse(user).username;
                } else {
                    return '';
                }
            },

            //是否。。。
            isWelcome() {
                return sessionStorage.getItem("user") ? 'inline-block' : 'none';
            },
        },
        methods: {
            //点击搜索按钮的UI交互
            UISearch(event) {
                event.currentTarget.style.display = "none";
                document.querySelector("#search").style.display = "inline-block";
                this.UISearchUnFocus();
            },
            //搜索按钮unfocus的UI
            UISearchUnFocus() {
                document.querySelector("#search").addEventListener("blur", function () {
                    document.querySelector("#search").style.display = "none";
                    document.querySelector("#searchBtn").style.display = "inline-block";
                })
            },
            //打开login框
            openLoginModal() {
                if (document.querySelector("#loginModal").style.display === 'none' || document.querySelector("#loginModal").style.display === '') {
                    document.querySelector("#loginModal").style.display = 'block';
                    document.querySelector("#username").focus();
                } else {
                    document.querySelector("#loginModal").style.display = 'none';
                }
            },

            //登录
            login() {
                let params = {};
                params.username = document.querySelector("#username").value.toString();
                let password = document.querySelector("#password").value.toString();
                if (password && params.username) {
                    params.csrfToken = this._getCookie('csrfToken');
                    params.token = this._getCookie('token');
                    params.ip = JSON.stringify(this._getClientIP());
                    params.encodePassword = CryptoJS.AES.encrypt(password, params.csrfToken).toString();
                    let self = this;
                    self.$http.post('/api/user/login', params).then(response => {
                        let newsTips = document.querySelector(".newsTips");
                        if (response.body.code === 200) {
                            self.newsTips.background = 'success';
                            self.newsTips.msg = response.body.msg;
                            document.querySelector(".modal").style.display = 'none';
                            document.querySelector(".newsTips").style.display = 'block';
                            self.tooltips = response.body.user;
                            self.tooltips.lastLoginDate = this.formatTime(response.body.user.lastLoginDate);
                            sessionStorage.setItem("user", JSON.stringify(response.body.user));
                            setTimeout(function () {
                                newsTips.style.transform = 'scale(1) translate(-50%,-50%)';
                            }, 10);
                            setTimeout(function () {
                                document.querySelector(".nav-behavior .icon-pw-login").style.display = 'none';
                                document.querySelector("#welcome").style.display = 'inline';
                                document.querySelector("#name").innerHTML = `${response.body.user.username}`;
                                newsTips.style.transform = 'scale(0) translate(-50%,-50%)';
                                setTimeout(function () {
                                    newsTips.style.display = 'none';
                                }, 500);
                                document.querySelector(".modal").style.display = 'none';
                            }, 1000);
                            //admin用户特殊处理
                            if (response.body.user.username === 'admin') {
                                self.isAdmin = true;
                            }
                        } else {
                            self.newsTips.background = 'error';
                            self.newsTips.msg = response.body.msg;
                            newsTips.style.display = 'block';
                            setTimeout(function () {
                                newsTips.style.transform = 'scale(1) translate(-50%,-50%)';
                            }, 10);
                            setTimeout(function () {
                                newsTips.style.transform = 'scale(0) translate(-50%,-50%)';
                                setTimeout(function () {
                                    newsTips.style.display = 'none';
                                }, 500)
                            }, 1000);

                        }
                    });
                } else {
                    //用户名或密码为空
                    this._newsTips('navNewsTips', 'error', '用户名或密码均不能为空');
                }
            },

            // 时间格式转换
            formatTime (date) {
                const Date = new Date(date)
                const year = Date.getFullYear()
                const month = Date.getMonth() < 9 ? `0${Date.getMonth() + 1}` : `${Date.getMonth() + 1}`
                const day = Date.getDate() < 10 ? `0${Date.getDate()}` : Date.getDate()
                const hours = Date.getHours() < 10 ? `0${Date.getHours()}` : Date.getHours()
                const minutes = Date.getMinutes() < 10 ? `0${Date.getMinutes()}` : Date.getMinutes()
                const seconds = Date.getSeconds() < 10 ? `0${Date.getSeconds()}` : Date.getSeconds()
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            },

            //添加用户
            addUser() {
                let params = {};
                params.username = document.querySelector("#username").value.toString();
                let password = document.querySelector("#password").value.toString();
                params.csrfToken = this._getCookie('csrfToken');
                params.ip = JSON.stringify(this._getClientIP());
                params.encodePassword = CryptoJS.AES.encrypt(password, params.csrfToken).toString();
                this.$http.post('/api/user/add', params).then(response => {
                    // alert(response.msg)
                });
            },

            //注销
            logout() {
                sessionStorage.removeItem("user");
                location.reload();
            },

            //转到添加博客页面
            locationToBlog() {
                this.$router.push('/blog/edit');
                // location.reload();
            },

            //即将开放功能
            toDo() {
                window.alert('即将开放，敬请期待！');
            },

            //回车键登录
            enterLogin() {
                const self = this;
                document.addEventListener('keyup', function (event) {
                    if (event.key === 'Enter') {//按的回车键
                        if (document.querySelector(".modal").style.display === 'block') {
                            self.login();
                        }
                    }
                })
            },

            //点击登录
            clickLogin() {
                const self = this;
                document.querySelector("#login").addEventListener("click", function () {
                    self.login();
                })
            },

            //是否登录 若登录 自动填充数据
            autoLoadData() {
                let user = sessionStorage.getItem('user');
                if (user) {
                    this.tooltips = JSON.parse(user);
                    this.isAdmin = JSON.parse(user).username === 'admin';
                }
            },

            /**
             * 显示newsTips框
             * @param id String newsTips框的id
             * @param type String newsTips框的类型
             * @param msg String newsTips框的内容
             * @private
             */
            _newsTips(id, type, msg) {
                this.newsTips.background = type;
                this.newsTips.msg = msg;
                let newsTips = document.querySelector(`#${id}`);
                newsTips.style.display = 'block';
                setTimeout(function () {
                    newsTips.style.transform = 'scale(1) translate(-50%,-50%)';
                }, 10);
                setTimeout(function () {
                    newsTips.style.transform = 'scale(0) translate(-50%,-50%)';
                    setTimeout(function () {
                        newsTips.style.display = 'none';
                    }, 500);
                }, 1000);
            },

            //获取对应key的cookie值
            _getCookie(key) {
                let cookies = document.cookie;
                let getKeyRegExp = new RegExp(key + "=[\\w-]*");
                let getKey = cookies.match(getKeyRegExp);
                if (!!getKey) {
                    return getKey[0].split('=')[1];
                } else {
                    return '无法找到指定cookie'
                }
            },
            //获取客户端ip
            _getClientIP() {
                return returnCitySN;
            },
            //测试
            test(key) {
                let cookies = document.cookie;
                let getKeyRegExp = new RegExp(key + "=[\\w-]*");
                let getKey = cookies.match(getKeyRegExp);
                console.log(cookies.match(getKeyRegExp))
                if (!!getKey) {
                    return getKey[0].split('=')[1];
                } else {
                    return '无指定cookie';
                }
            }
        },
    }


</script>

<style lang="less">

    #nav {
        background-color: #563d7c;
        height: 4rem;
        color: #cbbde2;
        position: sticky;
        width: 100rem;
        top: 0;
        box-shadow: 0 2px 5px #cbbde2;
        z-index: 1000;
        a {
            color: inherit;
            text-decoration: none;
            transition: color 0.2s ease-in-out;
        }
        a:hover {
            color: #fff;
            cursor: pointer;
        }
        //标志
        .brand {
            font-weight: 900;
            font-size: 2.3rem;
            line-height: 4rem;
            width: 25rem;
            text-align: center;
            display: block;
            float: left;
        }

        //功能栏
        .nav-list {
            width: 50rem;
            height: 4rem;
            line-height: 4rem;
            float: left;
            text-align: center;
            ul {
                width: 39rem;
                height: 4rem;
                display: inline-block;
                li {
                    float: left;
                    list-style-type: none;
                    margin-left: 2rem;
                }
            }
            a {
                font-size: 1.2rem;
                span {
                    font-size: 1.4rem;
                }
            }
        }

        //操作栏
        .nav-behavior {
            width: 25rem;
            height: 4rem;
            text-align: center;
            line-height: 4rem;
            float: left;
            span {
                font-size: 1.4rem;
                transition: color 0.2s ease-in-out;
            }
            span:hover {
                color: #ffe484;
                cursor: pointer;
            }
            label {
                margin-right: 1rem;
            }
            #search {
                line-height: 4rem;
                width: 12rem;
                height: 2rem;
                display: none;
                border-radius: 0.5rem;
                border: none;
                padding: 0 0.5rem;
                box-shadow: none;
                box-sizing: border-box;
                transition: box-shadow 0.15s ease-in-out;
            }
            #search:focus {
                outline: none;
                box-shadow: 0 0 0 3px #ffe484;
            }
        }

        //欢迎
        #welcome {
            font-size: 1.2rem;
            #name {
                font-size: 1.2rem;
                color: #ffe484;
                padding: 0 0.6rem;
                box-sizing: border-box;
            }
            #name:hover {
                cursor: pointer;
            }
        }
        .inline-block {
            display: inline-block;
        }
        .none {
            display: none;
        }
    }

    //个人信息
    #user {
        position: fixed;
        //用户信息
        #userInfo {
            box-sizing: border-box;
            width: 16rem;
            margin-top: 0.2rem;
            h5 {
                margin: 0.5rem 0;
                display: block;
                text-indent: 1rem;
                font-weight: normal;
            }
            span {
                display: inline-block;
                text-indent: 0;
            }
        }

        //用户操作
        #userOperating {
            > div {
                margin-top: 0.5rem;
            }
            button {
                margin-top: 0.5rem;
            }
        }
    }

</style>

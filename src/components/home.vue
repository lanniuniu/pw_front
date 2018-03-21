<template>
    <div id="home">
        <div id="leftMixed">

        </div>
        <right-mixed-component></right-mixed-component>
        <news-tips-component :backgroundProp="newsTips.background" :msgProp="newsTips.msg"></news-tips-component>
        <tooltips-component>
            <h1 id="lastLoginAddress"></h1>
            <h1 id="lastLoginDate"></h1>
            <h1 id="lastLoginIp"></h1>
        </tooltips-component>
    </div>
</template>

<script>
    const CryptoJS = require("crypto-js");
    export default {
        name: 'hello',
        data() {
            return {
                articleLists:[//博客列表
                    {

                    },
                ],
                newsTips:{//消息提示
                    background:'',//背景色
                    msg: '',//消息内容
                },
                tooltips:{//工具提示
                    lastLoginAddress:'',
                    lastLoginDate:'',
                    lastLoginIp:'',
                },
            }
        },
        created(){

        },
        mounted(){
            this.enterLogin();
            this.clickLogin();

        },
        methods:{
            //登录
            login() {
                let params = {};
                params.username = document.querySelector("#username").value.toString();
                let password = document.querySelector("#password").value.toString();
                params.csrfToken = this._getCookie('csrfToken');
                params.token = this._getCookie('token');
                params.ip = JSON.stringify(this._getClientIP());
                params.encodePassword = CryptoJS.AES.encrypt(password, params.csrfToken).toString();
                let self = this;
                self.$http.post('http://localhost:7001/user/login', params).then(response => {
                    if(response.body.code === 200){
                        self.newsTips.background = 'success';
                        self.newsTips.msg = response.body.msg;
                        document.querySelector(".modal").style.display = 'none';
                        document.querySelector(".newsTips").style.display = 'block';
                        self.tooltips = response.body.user;
                        sessionStorage.setItem("user",JSON.stringify(response.body.user));
                        setTimeout(function () {
                            document.querySelector(".nav-behavior .icon-login").style.display = 'none';
                            document.querySelector("#welcome").style.display = 'inline';
                            document.querySelector("#name").innerHTML = `${response.body.user.username}`;
                            document.querySelector(".newsTips").style.display = 'none';
                            document.querySelector(".modal").style.display = 'none';
                        },1000)
                    }else {
                        self.newsTips.background = 'error';
                        self.newsTips.msg = response.body.msg;
                        document.querySelector(".newsTips").style.display = 'block';
                        setTimeout(function () {
                            document.querySelector(".newsTips").style.display = 'none';
                        },1000)
                    }
                });
            },

            //添加用户
            addUser() {
                let params = {};
                params.username = document.querySelector("#username").value.toString();
                let password = document.querySelector("#password").value.toString();
                params.csrfToken = this._getCookie('csrfToken');
                params.ip = JSON.stringify(this._getClientIP());
                params.encodePassword = CryptoJS.AES.encrypt(password, params.csrfToken).toString();
                this.$http.post('/user/add', params).then(response => {
                    // alert(response.msg)
                });
            },

            //回车键登录
            enterLogin() {
                const self = this;
                document.addEventListener('keyup', function (event) {
                    if (event.key === 'Enter') {//按的回车键
                        if (document.querySelector(".modal").style.display = 'block') {
                            self.login();
                        }
                    }
                })
            },

            //点击登陆
            clickLogin(){
                const self = this;
                document.querySelector("#login").addEventListener("click",function () {
                    self.login();
                })
            },

            //监听tooltips

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    #home{
        width: 90em;
        height: 200rem;
        margin: 75px auto;
    }

    #leftMixed{
        width: 56.5rem;
        padding: 1rem;
        background-color: white;
        float: left;
        height: 100rem;
        border-radius: 0.5rem;
    }
</style>

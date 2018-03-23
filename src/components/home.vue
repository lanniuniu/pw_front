<template>
    <div id="home">
        <div id="leftMixed">

        </div>
        <right-mixed-component></right-mixed-component>
        <news-tips-component :backgroundProp="newsTips.background" :msgProp="newsTips.msg"></news-tips-component>
        <tooltips-component id="user">
            <div id="userInfo">
                <badge-component class="badge badge-info">用户信息</badge-component>
                <h5 id="lastLoginAddress">上次登录地点: &nbsp;<badge-component class="badge badge-info">{{tooltips.lastLoginAddress}}</badge-component></h5>
                <h5 id="lastLoginDate">上次登录时间: &nbsp;<badge-component class="badge badge-info">{{tooltips.lastLoginDate}}</badge-component></h5>
                <h5 id="lastLoginIp">上次登录 &nbsp;I P : &nbsp;<badge-component class="badge badge-info">{{tooltips.lastLoginIp}}</badge-component></h5>
            </div>
            <div id="userOperating">
                <badge-component class="badge badge-primary">用户操作</badge-component>
                <div v-if="isAdmin">
                    <button-component class="btn btn-primary">添加blog</button-component>
                    <button-component class="btn btn-danger">异常处理</button-component>
                </div>
                <button-component class="btn btn-warning" @click="logOut">注销</button-component>
            </div>
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
                isAdmin: false,
            }
        },
        created(){

        },
        mounted(){
            this.enterLogin();
            this.clickLogin();
            this.autoLoadData();
        },
        computed:{

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
                        },1000);
                        //admin用户特殊处理
                        if(response.body.user.username === 'admin'){
                            self.isAdmin = true;
                            console.log('更改')
                        }
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

            //注销
            logOut(){
                console.log(1231)
                sessionStorage.removeItem("user");
                // location.reload();
                console.log(sessionStorage.getItem("user"))
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

            //点击登录
            clickLogin(){
                const self = this;
                document.querySelector("#login").addEventListener("click",function () {
                    self.login();
                })
            },

            //是否登录 若登录 自动填充数据
            autoLoadData(){
                let user = sessionStorage.getItem('user');
                if (user){
                    this.tooltips = JSON.parse(user);
                    this.isAdmin = JSON.parse(user).username === 'admin';
                }
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
        margin: 5rem auto;
    }

    //左边
    #leftMixed{
        width: 56.5rem;
        padding: 1rem;
        background-color: white;
        float: left;
        height: 100rem;
        border-radius: 0.5rem;
    }

    #user{
        position: fixed;
        //用户信息
        #userInfo{
            box-sizing: border-box;
            width: 15rem;
            margin-top: 0.2rem;
            h5{
                margin: 0.5rem 0;
                display: block;
                text-indent: 1rem;
                font-weight: normal;
            }
            span{
                display: inline-block;
                text-indent: 0;
            }
        }

        //用户操作
        #userOperating{
            >div{
                margin-top: 0.5rem;
            }
            button{
                margin-top: 0.5rem;
            }
        }
    }

</style>

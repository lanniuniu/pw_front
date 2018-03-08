<template>
    <div class="modal">
        <h1>登录 <span @click="closeModal">×</span></h1>
        <input type="text" placeholder="username/email" id="username">
        <input type="password" placeholder="password" id="password">

        <div>
            <button @click="closeModal">取消</button>
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
    const CryptoJS = require("crypto-js");
    export default {
        name: "modal",
        mounted(){

        },
        methods:{
            //隐藏modal框
            closeModal(){
                document.querySelector(".modal").style.display = 'none';
            },
            //登录
            login(){
                let params = {};
                params.username = document.querySelector("#username").value.toString();
                let password = document.querySelector("#password").value.toString();
                params.csrfToken = this._getCookie('csrfToken');
                params.ip = JSON.stringify(this._getClientIP());
                params.encodePassword = CryptoJS.AES.encrypt(password,params.csrfToken).toString();
                this.$http.post('/user/login',params).then(response=>{
                    console.log(response)
                });
            },
            //获取对应key的cookie值
            _getCookie(key){
                let cookies = document.cookie;
                let getKeyRegExp = new RegExp(key+"=[\\w-]*");
                let getKey = cookies.match(getKeyRegExp)[0];
                return getKey.split('=')[1];
            },
            //获取客户端ip
            _getClientIP(){
                return returnCitySN;
            }
        },
    }
</script>

<style scoped lang="less">
    .modal{
        position: fixed;
        top: 4.5rem;
        right: 1rem;
        width: 20rem;
        height: 13rem;
        background-color: #563d7c;
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px #cbbde2;
        display: none;
        padding: 1rem;
        h1{
            color: #cbbde2;
            line-height: 2rem;
            font-size: 1.5rem;
            text-align: left;
            span{
                float: right;
                font-size: 1rem;
            }
        }
        input{
            display: block;
            width: 58%;
            height: 1.8rem;
            margin: 1rem auto 0.5rem auto;
            border-radius: 0.5rem;
            border: 1px solid #ced4da;
            background-color: #563d7c;
            color: #cbbde2;
            font-size: 1rem;
            padding: 0.3rem 0.5rem;
            transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */
            color: #cbbde2;
        }
        input:focus{
            outline: none;
            border-color: #ffe484;
            box-shadow: 0 0 0 2px #ffe484;
        }
        button{
            padding: 0 1rem;
            border-radius: 0.5rem;
            border: 1px solid #cbbde2;
            height: 2.5rem;
            line-height: 2.5rem;
            background-color: #563d7c;
            color: #cbbde2;
            font-size: 1.1rem;
            margin: 0 0.3rem;
        }
        button:hover{
            cursor: pointer;
            color: #ffe484;
            background-color: #47157c;
        }
        button:focus{
                outline: none;
                box-shadow: 0 0 0 3px rgba(121,82,179,.25);
            }
    }
</style>
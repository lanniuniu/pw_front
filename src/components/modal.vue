<template>
    <div class="modal">
        <h1>登录 <span @click="closeModal">×</span></h1>
        <input type="text" placeholder="username/email">
        <input type="password" placeholder="password">

        <div><button @click="closeModal">取消</button><button>登录</button></div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        methods:{
            closeModal(){
                document.querySelector(".modal").style.display = 'none';
            },
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
            background-color: #47157c;
            color: #cbbde2;
            font-size: 1.1rem;
            margin: 0 0.3rem;
        }
        button:hover{
            cursor: pointer;
            color: #ffe484;
        }
        button:focus{
                outline: none;
                box-shadow: 0 0 0 3px rgba(121,82,179,.25);
            }
    }
</style>
<template>
    <nav id="nav">
        <a href="#" class="brand">诗酒剑歌</a>
        <div class="nav-list">
            <ul>
                <li class="nav-item">
                    <a class="nav-link" href="#"> <span class="icon-home"></span>Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><span class="icon-doc"></span>Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#"><span class="icon-headphones"></span>Music</a>
                </li>
                <li class="nav-item dropdown">
                    <a href="#">
                        <span class="icon-gamepad"></span>Game
                    </a>
                    <!--<div class="dropdown-menu" aria-labelledby="navbarDropdown">-->
                    <!--<a class="dropdown-item" href="#">Action</a>-->
                    <!--<a class="dropdown-item" href="#">Another action</a>-->
                    <!--<a class="dropdown-item" href="#">Something else here</a>-->
                    <!--</div>-->
                </li>
                <li class="nav-item">
                    <a href="#">
                        <span class="icon-info-circled">About me</span>
                    </a>
                </li>

            </ul>
        </div>
        <div class="nav-behavior">
            <label for="search"><span class="icon-search" title="搜索" @click="UISearch" id="searchBtn"></span>
                <input type="search" id="search" placeholder="Search" >
            </label>
            <span class="icon-login" title="登录"></span>
        </div>


    </nav>
</template>
<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            //点击搜索按钮的UI交互
            UISearch(event){
                event.currentTarget.style.display = "none";
                document.querySelector("#search").style.display = "inline-block";
                this.UISearchUnFocus();
            },
            UISearchUnFocus(){
                document.querySelector("#search").addEventListener("blur",function () {
                    document.querySelector("#search").style.display = "none";
                    document.querySelector("#searchBtn").style.display = "inline-block";
                })
            }
        },
    }
</script>

<style lang="less">

    #nav{
        background-color: #563d7c;
        height: 60px;
        color: #cbbde2;
        position: fixed;
        width: 100rem;
        top: 0;

        a{
            color: inherit;
            width: 20rem;
            text-decoration: none;
            font-size: 18px;
            span{
                font-size: 20px;
            }
        }
        a:hover{
            color: #fff;
        }

        ul{
            width: 37.5rem;
            height:60px;
            margin: 0 auto;

        }
        li{
            float: left;
            list-style-type: none;
            margin-left: 2rem;
        }

        //标志
        .brand{
            font-weight: 900;
            font-size: 30px;
            line-height: 60px;
            width: 25rem;
            text-align: center;
            display: block;
            float: left;
        }

        //功能栏
        .nav-list{
            display: block;
            width: 50rem;
            height: 60px;
            line-height: 60px;
            float: left;
        }

        //操作栏
        .nav-behavior{
            width: 25rem;
            height: 60px;
            text-align: center;
            line-height: 60px;
            float: left;
            span{
                font-size: 20px;
            }
            span:hover{
                color: #ffe484;
                cursor: pointer;
            }
            label{
                margin-right: 1rem;
            }
            #search{
                line-height: 60px;
                width: 10rem;
                height: 2rem;
                display: none;
                border-radius: 0.5rem;
                border: none;
                padding: 0 0.5rem;
                box-shadow: none;
                transition: box-shadow 0.15s ease-in-out;
            }
            #search:focus{
                outline: none;
                box-shadow: 0 0 0 3px #ffe484;
            }
        }
    }

</style>
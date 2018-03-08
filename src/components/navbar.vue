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
                        <span class="icon-info-circled"></span>About me
                    </a>
                </li>

            </ul>
        </div>
        <div class="nav-behavior">
            <label for="search"><span class="icon-search" title="搜索" @click="UISearch" id="searchBtn"></span>
                <input type="search" id="search" placeholder="Search">
            </label>
            <span class="icon-login" title="登录" @click="openLoginModal"></span>
            <modal-component id="loginModal"></modal-component>
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {}
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
            openLoginModal(){
                if (document.querySelector("#loginModal").style.display === 'none'||document.querySelector("#loginModal").style.display === ''){
                    document.querySelector("#loginModal").style.display = 'block';
                }else {
                    document.querySelector("#loginModal").style.display = 'none';
                }
            },
        },
    }
</script>

<style lang="less">

    #nav {
        background-color: #563d7c;
        height: 4rem;
        color: #cbbde2;
        position: fixed;
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
            a{
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
                transition: box-shadow 0.15s ease-in-out;
            }
            #search:focus {
                outline: none;
                box-shadow: 0 0 0 3px #ffe484;
            }
        }
    }

</style>
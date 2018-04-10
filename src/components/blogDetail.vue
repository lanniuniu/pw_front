<template>
    <div id="blog">
        <div id="blogContent">
            <div>
                <div id="blogTitle">
                    <span class="icon-pw-doc"></span>{{title}}
                </div>
                <div id="blogInfo">
                    <div><span class="icon-calendar"></span>发布日期:{{releaseDate}}</div>
                    <div><span class="icon-folder-open"></span>分类:{{classify}}</div>
                    <div><span class="icon-pw-eye"></span>阅读量:{{reading}}</div>
                    <div><span class="icon-commenting"></span>评论数:{{0}}</div>
                </div>
            </div>
        </div>
        <div id="list">

        </div>
        <news-tips-component id="blogDetailTips" :backgroundProp="newsTips.background"
                             :msgProp="newsTips.msg"></news-tips-component>
    </div>
</template>

<script>
    export default {
        name: "blog-detail",
        created() {
            this.getDetail();
        },
        mounted() {
        },
        data() {
            return {
                classify: null,//分类
                releaseDate: null,//发布日期
                tag: null,//标签
                title: null,//标题
                reading:0,//阅读量
                newsTips: {//消息提示
                    background: '',
                    msg: '',
                },
            }
        },
        methods: {
            //请求数据
            getDetail() {
                let params = {};
                params._id = this.$route.params._id.split('=')[1];
                params.csrfToken = this._getCookie('csrfToken');
                let self = this;
                this.$http.post('http://localhost:7001/blog/detail', params).then((response) => {
                    if (response.body.code === 200) {
                        self.render(response.body.data)
                    }else {
                        self._newsTips('blogDetailTips', 'error', '获取博客详情失败');
                    }
                });
            },

            //渲染数据
            render(data) {
                console.log(data);
                let blog = document.querySelector("#blogContent");
                let contentHtml = document.createElement('div');
                contentHtml.setAttribute('id', 'content');
                contentHtml.innerHTML = data.content;
                contentHtml.style.padding = '1rem';
                contentHtml.style.borderRadius = '1rem';
                contentHtml.style.boxSizing = 'border-box';
                contentHtml.style.marginTop = '1rem';
                contentHtml.style.backgroundColor = 'white';
                contentHtml.style.boxShadow = '1px 1px 5px gray';
                blog.appendChild(contentHtml);

                this.classify = data.classify;
                this.tag = JSON.parse(data.tag);
                let releaseDate = new Date(data.releaseDate);
                this.releaseDate = `${releaseDate.getFullYear()}年${releaseDate.getMonth() + 1}月${releaseDate.getDate()}日`;
                this.title = data.title;
                this.reading = data.reading;
            },

            //获取cookie
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
        },
    }
</script>

<style scoped lang="less">
    #blog{
        min-height: 50rem;
    }
    #blogContent {
        width: 60%;
        margin: 1rem auto;

        #blogTitle{
            font-size: 1.7rem;
            color: #555;
            font-weight: 700;
            border-bottom: 2px solid #ddd;
            line-height: 2;
            span{
                margin-right: 1rem;
            }
        }
        #blogInfo{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            margin-top: 0.5rem;
            div:nth-child(1){
                flex: 1.5;
            }
            div:nth-child(2){
                flex: 1;
            }
            div:nth-child(3){
                flex: 1;
            }
            div:nth-child(4){
                flex: 3;
                display: inline;
                text-align: right;
                box-sizing: border-box;
                padding-right: 1rem;
            }
        }
    }
</style>
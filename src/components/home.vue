<template>
    <div id="home">
        <div id="leftMixed">
            <div class="blog" v-for="(blog, index) in blogLists" :key=index>
                <div class="blog-content">
                    <h2 class="blog-content-title"><span :data-_id="blog._id" title="查看博客" @click="redirect">{{blog.title}}</span>
                    </h2>
                    <p>{{blog.summary}}</p>
                </div>
                <div class="blog-footer">
                    <div class="blog-footer-time">发布日期:{{blog.releaseDate}}</div>
                    <div class="blog-footer-classify">分类:{{blog.classify}}</div>
                    <div class="blog-footer-tag">标签:
                        <badge-component class="badge badge-dark" v-for="(tag, index) in blog.tag" :key="index" >{{tag}}
                        </badge-component>
                    </div>
                    <div class="blog-footer-comment"><span class="icon-commenting" :data-_id="blog._id"
                                                           title="评论" @click="toDo"></span></div>
                </div>
            </div>
            <pagination-component v-show="pagination.counter" :page="pagination.page" :pageTotal="pagination.pageTotal"
                                  :counter="pagination.counter"
                                  @turnPage="list"></pagination-component>
        </div>
        <news-tips-component id="homeTips" :backgroundProp="newsTips.background"
                             :msgProp="newsTips.msg"></news-tips-component>
        <right-mixed-component></right-mixed-component>
    </div>
</template>

<script>

    export default {
        name: 'hello',
        data() {
            return {
                blogLists: [],//博客列表
                newsTips: {//消息提示
                    background: '',
                    msg: '',
                },
                pagination: {//分页数据
                    page: 1,
                    pageTotal: 1,
                    counter: 0,
                },
                mode: 'day',//日夜间模式
            }
        },
        created() {
            this.list();
        },
        mounted() {

        },
        computed: {},
        methods: {
            //获取博客列表
            list(params) {
                let query = {};
                if (!!params && !!params.page) {
                    query.page = params.page;
                }
                query.csrfToken = this._getCookie('csrfToken');

                let self = this;
                this.$http.post('/api/blog/list', query).then((response) => {
                    if (response.body.code === 200) {
                        self.blogLists = response.body.data.data.map((value) => {
                            let releaseDate = new Date(value.releaseDate);
                            value.releaseDate = `${releaseDate.getFullYear()}年${releaseDate.getMonth() + 1}月${releaseDate.getDate()}日`;
                            value.tag = JSON.parse(value.tag);
                            return value;
                        });
                        self.pagination.page = response.body.data.page;
                        self.pagination.pageTotal = response.body.data.pageTotal;
                        self.pagination.counter = response.body.data.counter;
                    } else {
                        self._newsTips('homeTips', 'error', '获取博客列表失败');
                    }
                })
            },
            //跳转博客详情
            redirect(event) {
                this.$router.push('/blog/detail/_id=' + event.currentTarget.getAttribute('data-_id'))
            },
            //即将开放功能
            toDo() {
                window.alert('即将开放，敬请期待！');
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    #home {
        width: 90em;
        min-height: 50rem;
        margin: 1rem auto;
    }

    //左边
    #leftMixed {
        width: 56.5rem;
        padding: 1rem;
        background-color: white;
        float: left;
        border-radius: 0.5rem;
        box-sizing: border-box;
        .blog {
            display: flex;
            border: 1px solid #6c757d;
            box-sizing: border-box;
            border-radius: .25rem;
            margin-bottom: 1rem;
            flex-direction: column;

            .blog-content {
                box-sizing: border-box;
                padding: 1rem;
                color: #343a40;

                .blog-content-title {
                    font-size: 2rem;
                    font-weight: 500;
                    margin-bottom: 0.5rem;
                    line-height: 1;
                    span {
                        cursor: pointer;
                    }
                }
            }

            .blog-footer {
                box-sizing: border-box;
                background-color: rgba(0, 0, 0, .03);
                border-bottom: 1px solid rgba(0, 0, 0, .125);
                padding: .8rem 1rem;
                display: inline-flex;
                flex-direction: row;
                flex-wrap: nowrap;

                .blog-footer-time {
                    flex: 2;
                }
                .blog-footer-classify {
                    flex: 1.5;
                }
                .blog-footer-tag {
                    flex: 3;
                    > span {
                        margin-right: 1px;
                    }
                }
                .blog-footer-comment {
                    flex: 0.1;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    span {
                        cursor: pointer;
                    }

                }
            }
        }
    }

</style>

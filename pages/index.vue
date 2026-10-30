<template>
    <div id="home">
        <div id="leftMixed">
            <div class="blog" v-for="(blog, index) in blogLists" :key="index">
                <div class="blog-content">
                    <h2 class="blog-content-title"><span :data-_id="blog._id" title="查看博客" @click="redirect">{{blog.title}}</span>
                    </h2>
                    <p>{{blog.summary}}</p>
                </div>
                <div class="blog-footer">
                    <div class="blog-footer-time">发布日期:{{blog.releaseDate}}</div>
                    <div class="blog-footer-classify">分类:{{blog.classify}}</div>
                    <div class="blog-footer-tag">标签:
                        <badge-component class="badge badge-dark" v-for="(tag, index) in blog.tag" :key="index">{{tag}}
                        </badge-component>
                    </div>
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
import cookie from 'cookie'

function parseBlogs(data) {
    return data.map((value) => {
        let releaseDate = new Date(value.releaseDate)
        value.releaseDate = `${releaseDate.getFullYear()}年${releaseDate.getMonth() + 1}月${releaseDate.getDate()}日`
        value.tag = JSON.parse(value.tag)
        return value
    })
}

export default {
    name: 'home',
    data() {
        return {
            blogLists: [],
            newsTips: {
                background: '',
                msg: '',
            },
            pagination: {
                page: 1,
                pageTotal: 1,
                counter: 0,
            },
            mode: 'day',
        }
    },
    // SSR 服务端预取首页数据
    async asyncData({ $axios, req }) {
        try {
            let query = {}
            if (req) {
                const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {}
                query.csrfToken = cookies.csrfToken || ''
            }
            const response = await $axios.get('/api/blog/list', { params: query })
            if (response.data && response.data.code === 200) {
                return {
                    blogLists: parseBlogs(response.data.data.data),
                    pagination: {
                        page: response.data.data.page,
                        pageTotal: response.data.data.pageTotal,
                        counter: response.data.data.counter,
                    }
                }
            }
        } catch (e) {
            // SSR 阶段失败回退为空数据，客户端会再拉取
        }
        return {}
    },
    mounted() {
        // SSR 阶段失败时客户端补拉数据
        if (this.blogLists.length === 0) {
            this.list()
        }
    },
    methods: {
        //获取博客列表
        list(params) {
            let query = {}
            if (!!params && !!params.page) {
                query.page = params.page
            }
            query.csrfToken = this.$getCsrfToken()
            let self = this
            this.$axios.get('/api/blog/list', { params: query }).then((response) => {
                if (response.data.code === 200) {
                    self.blogLists = parseBlogs(response.data.data.data)
                    self.pagination.page = response.data.data.page
                    self.pagination.pageTotal = response.data.data.pageTotal
                    self.pagination.counter = response.data.data.counter
                } else {
                    self._newsTips('homeTips', 'error', '获取博客列表失败')
                }
            })
        },
        //跳转博客详情
        redirect(event) {
            this.$router.push('/blog/detail/' + event.currentTarget.getAttribute('data-_id'))
        },
        //即将开放功能
        toDo() {
            window.alert('即将开放，敬请期待！')
        },

        /**
         * 显示newsTips框
         * @param id String newsTips框的id
         * @param type String newsTips框的类型
         * @param msg String newsTips框的内容
         * @private
         */
        _newsTips(id, type, msg) {
            if (!process.client) return
            this.newsTips.background = type
            this.newsTips.msg = msg
            let newsTips = document.querySelector(`#${id}`)
            newsTips.style.display = 'block'
            setTimeout(function () {
                newsTips.style.transform = 'scale(1) translate(-50%,-50%)'
            }, 10)
            setTimeout(function () {
                newsTips.style.transform = 'scale(0) translate(-50%,-50%)'
                setTimeout(function () {
                    newsTips.style.display = 'none'
                }, 500)
            }, 1000)
        },
    },
}
</script>

<style lang="less">
    #home {
        width: 90em;
        min-height: 50rem;
        margin: 1rem auto;
    }

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
            }
        }
    }
</style>

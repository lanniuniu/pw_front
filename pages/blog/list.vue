<template>
    <div id="blogLists">
        <div id="blogInfo">
            <div class="input-group">
                <div class="preInput">
                    <span>关键字</span>
                </div>
                <input type="text" placeholder="输入标题、标签" id="keywords" v-model="keywords">
            </div>
            <div class="input-group">
                <div class="preInput">
                    <span>分类</span>
                </div>
                <select name="classify" id="classify" v-model="classifySelected">
                    <option value="">选择分类</option>
                    <option v-for="(value, index) in classify" :value="value" :key="index">{{value}}</option>
                </select>
            </div>
            <span class="icon-pw-search" id="search" @click="list"></span>
        </div>
        <div id="blogList">
            <table-component :data="table.data" :header="table.header" :index="table.index"></table-component>
            <pagination-component v-show="pagination.counter" :page="pagination.page" :pageTotal="pagination.pageTotal"
                                  :counter="pagination.counter"
                                  @turnPage="list"></pagination-component>
        </div>
        <news-tips-component id="blogListTips" :backgroundProp="newsTips.background"
                             :msgProp="newsTips.msg"></news-tips-component>
    </div>
</template>

<script>
import cookie from 'cookie'

function parseBlogs(data) {
    return data.map((value) => {
        let releaseDate = new Date(value.releaseDate)
        value.releaseDate = `${releaseDate.getFullYear()}/${releaseDate.getMonth() + 1}/${releaseDate.getDate()}`
        value.tag = JSON.parse(value.tag)
        return value
    })
}

export default {
    name: "blog-list",
    data() {
        return {
            keywords: '',
            classifySelected: '',
            table: {
                data: [],
                header: [],
                index: [],
            },
            newsTips: {
                background: '',
                msg: '',
            },
            pagination: {
                page: 1,
                pageTotal: 1,
                counter: 0,
            },
            classify: [],
        }
    },
    async asyncData({ $axios, req }) {
        const classifyResult = []
        try {
            const resClassify = await $axios.get('/api/blog/classify')
            if (resClassify.data && resClassify.data.code === 200) {
                classifyResult.push(...resClassify.data.data)
            }
        } catch (e) {}

        try {
            let query = {}
            if (req) {
                const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {}
                query.csrfToken = cookies.csrfToken || ''
            }
            const response = await $axios.get('/api/blog/list', { params: query })
            if (response.data && response.data.code === 200) {
                return {
                    classify: classifyResult,
                    table: {
                        data: parseBlogs(response.data.data.data),
                        header: ['标题', '发布日期', '分类', '标签'],
                        index: ['title', 'releaseDate', 'classify', 'tag'],
                    },
                    pagination: {
                        page: response.data.data.page,
                        pageTotal: response.data.data.pageTotal,
                        counter: response.data.data.counter,
                    }
                }
            }
        } catch (e) {}
        return { classify: classifyResult }
    },
    mounted() {
        if (this.table.data.length === 0) {
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
            let keywords = this.keywords
            let classify = this.classifySelected
            if (!!keywords) {
                query.keywords = keywords
            }
            if (!!classify) {
                query.classify = classify
            }
            query.csrfToken = this.$getCsrfToken()
            let self = this
            this.$axios.get('/api/blog/list', { params: query }).then((response) => {
                if (response.data.code === 200) {
                    self.table.data = parseBlogs(response.data.data.data)
                    self.table.header = ['标题', '发布日期', '分类', '标签']
                    self.table.index = ['title', 'releaseDate', 'classify', 'tag']
                    self.pagination.page = response.data.data.page
                    self.pagination.pageTotal = response.data.data.pageTotal
                    self.pagination.counter = response.data.data.counter
                    if (process.client) {
                        document.documentElement.scrollTop = 0
                    }
                } else {
                    self._newsTips('blogListTips', 'error', '获取博客列表失败')
                }
            })
        },

        //获取所有分类
        getClassify() {
            let self = this
            this.$axios.get('/api/blog/classify').then((res) => {
                if (res.data.code === 200) {
                    self.classify = res.data.data
                } else {
                    self._newsTips('blogListTips', 'error', '获取分类列表失败')
                }
            })
        },

        //跳转博客详情
        redirect(event) {
            this.$router.push('/blog/detail/' + event.currentTarget.getAttribute('data-_id'))
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

<style scoped lang="less">
    #blogLists {
        width: 80rem;
        margin: 1rem auto;
        min-height: 50rem;
    }

    #blogList {
        width: 80rem;
        padding: 1rem;
        min-height: 20rem;
        margin-bottom: 1rem;
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
                    flex: 1;
                }
                .blog-footer-tag {
                    flex: 2;
                    > span {
                        margin-right: 1px;
                    }
                }
            }
        }
    }

    #blogInfo {
        box-sizing: border-box;
        padding: 1rem 10rem;
        background-color: white;
        display: flex;

        .input-group {
            display: inline-flex;
            width: 25rem;
            box-sizing: border-box;
            align-items: stretch;
            flex-wrap: wrap;
            margin-left: 0.4rem;
            flex: 3;

            .preInput {
                display: flex;
                box-sizing: border-box;
                margin-right: -1px;
                span {
                    display: flex;
                    align-items: center;
                    padding: .375rem .75rem;
                    margin-bottom: 0;
                    font-size: 1rem;
                    font-weight: 400;
                    line-height: 1.5;
                    color: #495057;
                    text-align: center;
                    white-space: nowrap;
                    background-color: #e9ecef;
                    border: 1px solid #ced4da;
                    border-radius: .25rem;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
            }
            input {
                position: relative;
                flex: 1 1 auto;
                width: 1%;
                margin-bottom: 0;
                display: block;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                overflow: visible;
                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }
            input:focus {
                color: #495057;
                background-color: #fff;
                border-color: #80bdff;
                outline: 0;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
            }

            select {
                position: relative;
                flex: 1 1 auto;
                width: 1%;
                margin-bottom: 0;
                display: block;
                padding: .375rem .75rem;
                font-size: 1rem;
                line-height: 1.5;
                color: #495057;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid #ced4da;
                border-radius: .25rem;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                overflow: visible;
                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }
            select:focus {
                color: #495057;
                background-color: #fff;
                border-color: #80bdff;
                outline: 0;
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .25);
            }
        }
        #search {
            cursor: pointer;
            font-size: 1.2rem;
            display: inline;
            text-align: center;
            box-sizing: border-box;
            padding: 0.5rem 1rem;
            margin-left: 1rem;
            transition: transform 0.3s ease-in-out;
        }
        #search:hover {
            transform: scale(1.5);
        }
    }
</style>

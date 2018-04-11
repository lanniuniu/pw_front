<template>
    <nav>
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" @click="previous">Previous</a>
            </li>
            <li v-for="index in pageCount" class="page-item">
                <a class="page-link" @click="locationToPage">{{index + pageStart}}</a>
            </li>
            <li class="page-item" :data-info="info">
                <a class="page-link" @click="next">Next</a>
            </li>
            <li class="info">{{info}}</li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "pagination",
        props: {
            page: {//第几页
                type: Number,
                required: true,
            },
            pageTotal: {//共几页
                type: Number,
                required: true,
            },
            counter:{//共多少项
                type: Number,
                required: true,
            }
        },
        data() {
            return {}
        },
        computed: {
            //分页信息
            info() {
                return `当前第${this.page}页,共${this.counter}项`;
            },
            //分页——显示的页总数
            pageCount() {
                if (this.pageTotal - this.page < 10) {
                    return this.pageTotal - this.page + 1;
                } else {
                    return 10;
                }
            },
            //分页——起始页
            pageStart() {
                return Math.floor(this.page / 10) * 10;
            },
        },
        watch:{
            page(){
                this.ready();
            },
        },
        mounted(){
            this.ready();
        },
        methods:{
            // 准备工作
            ready(){
                let pagination = document.querySelector(".pagination").children;
                if (this.page === 1) {
                    pagination[0].className += ' disabled';
                }
                if (this.page === this.pageTotal) {
                    pagination[pagination.length - 2].className += ' disabled';
                }
                pagination[this.page % 10].className += ' current'
            },
            // 上一页
            previous(event){
                if(this.page>1 && !event.currentTarget.parentNode.className.includes('disabled')){
                    let params = {};
                    params.page = this.page-1;
                    this.$emit('turnPage',params);
                }

            },
            //跳到指定页
            locationToPage(event){
                let params = {};
                params.page = Number(event.currentTarget.innerHTML);
                this.$emit('turnPage',params)
            },
            //下一页
            next(event){
                if(this.page < this.pageTotal && !event.currentTarget.parentNode.className.includes('disabled')){
                    let params = {};
                    params.page = this.page+1;
                    this.$emit('turnPage',params);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    nav {
        display: block;
        box-sizing: border-box;
        .pagination {
            display: flex;
            flex-direction: row;
            list-style: none;
            border-radius: .25rem;
            justify-content: center;
            .page-item {
                box-sizing: border-box;
                .page-link {
                    position: relative;
                    display: block;
                    cursor: pointer;
                    padding: .5rem .75rem;
                    margin-left: -1px;
                    line-height: 1.25;
                    color: #343a40;
                    background-color: #fff;
                    border: 1px solid #dee2e6;
                    text-decoration: none;
                }
                .page-link:hover {
                    background-color: #e9ecef;
                }
            }
            .current > a {
                background-color: #e9ecef !important;
            }
            .disabled > a {
                color: #dee2e6 !important;
                cursor: not-allowed !important;
                background-color: inherit !important;
            }
            .page-item:nth-child(1) > a {
                border-bottom-left-radius: 0.25rem;
                border-top-left-radius: 0.25rem;
            }
            .page-item:nth-last-child(1) > a {
                border-bottom-right-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
            }
            .info {
                padding: .5rem .75rem;
            }
        }

    }
</style>
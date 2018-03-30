<template>
    <div class="main">
        <div id="blogInfo">
            <div class="input-group">
                <div class="preInput">
                    <span>标题</span>
                </div>
                <input type="text" placeholder="输入标题，必填" id="title" autofocus="autofocus">
            </div>
            <div class="input-group">
                <div class="preInput">
                    <span>分类</span>
                </div>
                <input type="text" placeholder="输入分类，必填" id="classify">
            </div>
            <div class="input-group">
                <div class="preInput">
                    <span>标签</span>
                </div>
                <input type="text" placeholder="输入标签，以空格间隔" id="tag">
            </div>
        </div>
        <mavon-editor id="editor" v-model="value" @save="save"/>
        <news-tips-component id="blogNewsTips" :backgroundProp="newsTips.background"
                             :msgProp="newsTips.msg"></news-tips-component>
    </div>

</template>

<script>
    import download from '../assets/js/download';//引入download
    export default {
        name: "add-blog",
        data() {
            return {
                value: '',
                newsTips: {//消息提示
                    background: '',//背景色
                    msg: '',//消息内容
                },


            }
        },
        mounted() {

        },
        methods: {
            //保存时触发
            save(markdown, html) {
                let title = document.querySelector("#title").value.toString();
                let classify = document.querySelector("#classify").value.toString();
                let tag = document.querySelector("#tag").value.toString();

                if (markdown && title && classify && tag) {
                    let isSaveToLocal = confirm('是否保存到本地');
                    if(isSaveToLocal){
                        //保存到本地
                        download(title,markdown)
                    }
                    this.$http.post('/blog/add',html).then(response=>{
                        // console.log()
                    })
                } else {
                    this._newsTips('blogNewsTips', 'error', '标题、分类、标签、博客不能为空');
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

        }
    }
</script>

<style scoped lang="less">
    .main {
        z-index: unset;
        //blog 信息输入样式
        #blogInfo {
            box-sizing: border-box;
            padding: 1rem;
            background-color: white;

            .input-group {
                display: inline-flex;
                width: 32rem;
                box-sizing: border-box;
                align-items: stretch;
                flex-wrap: wrap;
                margin-left: 0.4rem;

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
            }

        }
        //编辑器
        #editor {
            z-index: unset;
            min-height: 60rem;
        }
    }
</style>
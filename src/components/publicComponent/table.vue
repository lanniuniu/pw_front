<template>
    <table>
        <thead>
        <tr>
            <th v-for="value in header">{{value}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="value in data">
            <th v-for="(indexValue) in index">
                <a v-if="indexValue==='title'" class="title" @click="redirect" :data-_id="value._id">{{value[indexValue]}}</a>
                <badge-component v-else-if="indexValue==='tag'" v-bind:key="Math.random()" v-for="badgeValue in value[indexValue]" class="badge badge-dark">{{badgeValue}}</badge-component>
                <span v-else>{{value[indexValue]}}</span>
            </th>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "table",
        props: {
            data: {//表格数据
                type: Array,
                required: true,
            },
            header: {//表格表格
                type: Array,
                required: true,
            },
            index: {
                type: Array,
                required: true,
            }
        },
        created() {
        },
        computed: {},
        mounted() {

        },
        methods: {
            //跳转博客详情
            redirect(event){
                this.$router.push('/blog/detail/_id='+event.currentTarget.getAttribute('data-_id'))
            },
        },
    }
</script>

<style scoped lang="less">
    table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
        border-collapse: collapse;
        box-sizing: border-box;
        thead {
            box-sizing: border-box;
            th {
                vertical-align: bottom;
                box-sizing: border-box;
                border-bottom: 2px solid #dee2e6;
                padding: .75rem;
                border-top: 1px solid #dee2e6;
                font-weight: 600;
                font-size: 1.5rem;
            }
        }
        tbody {
            box-sizing: border-box;
            th {
                box-sizing: border-box;
                padding: .75rem;
                vertical-align: top;
                border-top: 1px solid #dee2e6;
                font-weight: 500;
                font-size: 1.2rem;
            }
            .title{
                cursor: pointer;
                font-weight: 500;
            }
            tr:nth-child(2){
                background-color: #b8daff;
            }
            tr:nth-child(3){
                background-color: #d6d8db;
            }
            tr:nth-child(4){
                background-color: #c3e6cb;
            }
            tr:nth-child(5){
                background-color: #f5c6cb;
            }
            tr:nth-child(6){
                background-color: #ffeeba;
            }
            tr:nth-child(7){
                background-color: #bee5eb;
            }
            tr:nth-child(8){
                background-color: #fdfdfe;
            }
            tr:nth-child(9){
                background-color: #c6c8ca;
                th{
                    border-color: #32383e;
                }
            }
            tr:nth-child(10){
                background-color: teal;
            }
            .badge{
                margin-right: 1px;
            }
        }
    }
</style>
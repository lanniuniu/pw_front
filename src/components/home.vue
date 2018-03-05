<template>
    <div id="home">
        <div id="leftMixed">

        </div>
        <right-mixed-component></right-mixed-component>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                articleLists:[
                    {

                    },
                ],
            }
        },
        created(){

        },
        methods:{

        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    #home{
        width: 90em;
        height: 200rem;
        margin: 75px auto;
    }

    #leftMixed{
        width: 56.5rem;
        padding: 1rem;
        background-color: white;
        float: left;
        height: 100rem;
        border-radius: 0.5rem;
    }
</style>

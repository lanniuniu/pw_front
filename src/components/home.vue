<template>
    <div class="home">
        <div class="background">
            <section>
                <h3>我有一个呆宝宝</h3>
                <h3>她是一个大哈宝</h3>
            </section>
            <img src="../../static/dai1.jpg" alt="呆宝宝">
            <section>
                <h3>她为什么这么哈</h3>
                <h3>我也不晓得的嘛</h3>
            </section>
            <img src="../../static/dai2.jpg" alt="我爱你">
            <section>
                <h3>爱你哟，呆宝宝</h3>
            </section>
            <img src="../../static/dai4.jpg" alt="我爱你">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .home{
        background-color: rgba(248, 251, 117, 0.1);
    }
    section{
        text-align: center;
    }

    .background{
        img{
            width: 21rem;
            display: block;
            height: 14rem;
            margin: 20px auto;
        }
    }
</style>

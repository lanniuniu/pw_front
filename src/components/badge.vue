<template>
    <span>
        <slot></slot>
    </span>
</template>

<script>
    export default {
        name: "badge"
    }
</script>

<style scoped>
    .badge{
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        font-size: 0.8rem;
        white-space: nowrap;
    }
    .badge-primary{
        background-color: #007bff;
        color: white;
    }
    .badge-info{
        background-color: #17a2b8;
        color: white;
    }
</style>
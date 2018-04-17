<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "button"
    }
</script>

<style scoped>
    .btn {
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid transparent;
        padding: .375rem .75rem;
        font-size: 1rem;
        border-radius: .25rem;
        cursor: pointer;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }

    .btn-primary {
        color: #fff;
        background-color: #007bff;
        border-color: #007bff;
    }

    .btn-primary:hover {
        background-color: #0069d9;
        border-color: #0062cc;
    }

    .btn-primary:focus {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, .5);
    }

    .btn-danger {
        color: #fff;
        background-color: #dc3545;
        border-color: #dc3545;
    }

    .btn-danger:hover {
        background-color: #c82333;
        border-color: #bd2130;
    }

    .btn-danger:focus {
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .5);
        outline: 0;
    }

    .btn-warning {
        color: #212529;
        background-color: #ffc107;
        border-color: #ffc107;
    }

    .btn-warning:hover {
        background-color: #e0a800;
        border-color: #d39e00;
    }

    .btn-warning:focus {
        box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, .5);
        outline: 0;
    }


</style>
<template>
    <section class="notification container-small">
        <p>hello i am Notification</p>
    </section>
</template>

<script>
export default {
    name: 'Notification'
}
</script>

<style lang="scss">
.notification {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    background-color: #57a254;
}
</style>
